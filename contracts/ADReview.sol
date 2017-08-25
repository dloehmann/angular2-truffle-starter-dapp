pragma solidity ^0.4.11;

import "./AviaC01n.sol";

//ToDo: security and access restrictions 

contract ADReview is AviaC01n {

    bytes3 constant public version = 0x000100;

    uint   constant PRICE_PER_REVIEW = 1 ether;
    uint   constant REVIEW_DEPOSIT = 2 ether;
    uint16 constant UNDEFINED = 2 ** 15;

    struct PendingAssignment {
        address author;
        bytes32 hash;
    }

    struct Assignment {
        address author;
        uint ADNoteId;
        uint assignmentType;
    }

    event RfaChanged(uint rfaId);
    event NewADNote(uint adNoteId);
    event NewAssignmentAnnonce(address sender, uint rfaId, uint assAnnId);
    event NewAssignment(uint rfaId, uint assId);
    event AssignmentDepositClaimed(uint rfaId, uint assignmentId);
    event CorrectAssignmentDetermined(uint rfaId);

    enum RfaState {UNDEF, ACTIVE, ABORTED}
    struct RfA {
        address requester;
        bytes2 actypeId;
        bytes2 msn;
        uint16 date_from;
        uint16 date_to;
        uint16 numOfReviews;
        RfaState state;
        mapping (uint=>uint) correctAssignments; //ADNoteId => assignmentType
    }

    uint public maxRfaId = 0;
    uint public adNoteId = 0;

    mapping (uint => RfA) public rfas;
    mapping (uint => Assignment[]) public assignments;
    mapping (uint => PendingAssignment[]) public pendingAssignments;
    mapping (uint => bytes) public adNotes;


    function addADNote(bytes uri) {
        adNotes[++adNoteId] = uri;
        NewADNote(adNoteId);
    }


    function addRfAList(bytes6[] rfas_data, uint valid_until, uint numOfReviews) public {
        for(uint i=0; i<rfas_data.length; ++i) {
            var rfa_data = rfas_data[i];
            rfas[++maxRfaId] = RfA({
                requester: msg.sender,
                actypeId : bytes2(rfa_data & 0xFFFF00000000),
                msn      : bytes2((rfa_data & 0x0000FFFF0000) << 16),
                date_from : uint16(rfa_data & 0x00000000FFFF),
                date_to : uint16(valid_until),
                state   : RfaState.ACTIVE,
                numOfReviews: uint16(numOfReviews)
            });
            RfaChanged(maxRfaId);
        }
        var total_price = rfas_data.length * PRICE_PER_REVIEW * numOfReviews;
        if (!withdraw(msg.sender, total_price)) revert();
    }


    function abortRfA(uint rfaId) {
        require(rfaId <= maxRfaId);
        require(rfas[rfaId].state == RfaState.ACTIVE);
        rfas[rfaId].state = RfaState.ABORTED;
        RfaChanged(rfaId);
    }


    function annonceAssignment(uint rfaId, bytes32 assignmentHash) {
        require (pendingAssignments[rfaId].length <= rfas[rfaId].numOfReviews);
        var pending = pendingAssignments[rfaId];
        pending.push(PendingAssignment({
            author: msg.sender,
            hash: assignmentHash
        }));
        NewAssignmentAnnonce(msg.sender, rfaId, pending.length);
    }


    function saveAssignment(uint rfaId, uint announceId, uint nonce, bytes4 actype_msn, uint adnoteId, uint assignment_type) {
        var assignment_hash = keccak256(nonce, actype_msn, adnoteId, assignment_type);
        var a=pendingAssignments[rfaId][announceId];
        require (a.hash == assignment_hash && a.author == msg.sender);
        if (!withdraw(msg.sender, REVIEW_DEPOSIT)) revert();
        NewAssignment(rfaId, announceId);
    }


    function claimAssignmentDeposit(uint rfaId, uint assignmentId) {
        Assignment storage a = assignments[rfaId][assignmentId];
        require(a.author == msg.sender);
        require(rfas[rfaId].correctAssignments[a.ADNoteId] == a.assignmentType);
        if (!transfer(msg.sender, REVIEW_DEPOSIT)) revert();
        AssignmentDepositClaimed(rfaId, assignmentId);
    }


    function setCorrectAssignment(uint rfaId, uint[2][] _assignments) {
        var rfa = rfas[rfaId];
        for(uint i=0;i<_assignments.length;++i){
            rfa.correctAssignments[_assignments[0][i]] = _assignments[1][i];
        }
        CorrectAssignmentDetermined(rfaId);
    }


    function equalAssignments(Assignment[] storage _assignments, uint idx1, uint idx2) internal returns (bool) {
        return (idx1 == idx2 || _assignments[idx1].assignmentType == _assignments[idx2].assignmentType);
    }

}
