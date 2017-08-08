pragma solidity ^0.4.11;

contract TrustingToken{
    function trustedTransfer(address from, address to, uint amount) returns(bool){ return true; }
}

contract ADReview {

    bytes3 constant public version = 0x000100;

    TrustingToken avcToken = new TrustingToken();
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

    struct RfA {
        address requester;
        bytes2 actypeId;
        bytes2 msn;
        uint16 date_from;
        uint16 date_to;
        uint16 numOfReviews;
        mapping (uint=>uint) correctAssignments; //ADNoteId => assignmentType
    }

    uint public rfaid = 0;
    uint public adNoteId = 0;

    mapping (uint => RfA) public rfas;
    mapping (uint => Assignment[]) public assignments;
    mapping (uint => PendingAssignment[]) public pending_assignments;
    mapping (uint => bytes) public adNotes;


    function addADNote(bytes uri) {
        adNotes[++adNoteId] = uri;
    }


    function addRfAList(bytes6[] rfas_data, uint valid_until, uint numOfReviews) public {
        for(uint i=0; i<rfas_data.length; ++i) {
            var rfa_data = rfas_data[i];
            rfas[++rfaid] = RfA({
                requester: msg.sender,
                actypeId : bytes2(rfa_data & 0xFFFF00000000),
                msn      : bytes2((rfa_data & 0x0000FFFF0000) << 16),
                date_from : uint16(rfa_data & 0x00000000FFFF),
                date_to : uint16(valid_until),
                numOfReviews: uint16(numOfReviews)
            });
        }
        var total_price = rfas_data.length * PRICE_PER_REVIEW * numOfReviews;
        if (!avcToken.trustedTransfer(msg.sender, this, total_price)) revert();
    }


    function announceAssignment(uint rfaId, bytes32 assignmentHash) {
        require (pending_assignments[rfaId].length <= rfas[rfaId].numOfReviews);
        pending_assignments[rfaId].push(PendingAssignment({
            author: msg.sender,
            hash:assignmentHash
        }));
    }


    function saveAssignment(uint rfaId, uint announceId, uint nonce, bytes4 actype_msn, uint adnoteId, uint assignment_type) {
        var assignment_hash = keccak256(nonce, actype_msn, adnoteId, assignment_type);
        var a=pending_assignments[rfaId][announceId];
        require (a.hash == assignment_hash && a.author == msg.sender);
        if (!avcToken.trustedTransfer(msg.sender, this, REVIEW_DEPOSIT)) revert();
    }


    function claimAssignmentDeposit(uint rfaId, uint assignmentId) {
        Assignment a = assignments[rfaId][assignmentId];
        require(a.author == msg.sender);
        require(rfas[rfaId].correctAssignments[a.ADNoteId] == a.assignmentType);
        if (!avcToken.trustedTransfer(this, msg.sender, REVIEW_DEPOSIT)) revert();
    }


    function setCorrectAssignments(uint rfaId, uint[2][] assignments){
        var rfa = rfas[rfaId];
        for(uint i=0;i<assignments.length;++i){
            rfa.correctAssignments[assignments[0][i]] = assignments[1][i];
        }
    }


    function equalAssignments(Assignment[] storage assignments, uint idx1, uint idx2) internal returns (bool) {
        return (idx1 == idx2 || assignments[idx1].assignmentType == assignments[idx2].assignmentType);
    }

}
