const ADReview = artifacts.require("ADReview");
const Promise = require("bluebird");
const adReviewApi = require("../src/app/adReviewApi.js")(ADReview);

contract('ADReview', function(accounts) {
    let resolveWithEvent;
    let resolveOnce = (name, data) => {
        data._name = name;
        if (resolveWithEvent) {
            resolveWithEvent(data);
            resolveWithEvent = null;
        } else {
            console.log('WARN: orfane event:', data);
        }
    }

    before('init deployed objects', function() {
        return adReviewApi.initEventListeners({
            onRfaChanged: (args) => resolveOnce('onRfaChanged',args),
            onNewADNote:  (args) => resolveOnce('onNewADNote', args),
            onNewAssignmentAnnonce: (args) => resolveOnce('onNewAssignmentAnnonce', args),
            onNewAssignment: (args) => resolveOnce('onNewAssignment',args),
            onAssignmentDepositClaimed: (args) => resolveOnce('onAssignmentDepositClaimed', args),
            onCorrectAssignmentDetermined: (args) => resolveOnce('onCorrectAssignmentDetermined', args)
        });
    });

    after('cleanup event listeners', function() {
        console.log('cleanup');
        return adReviewApi.detachEventListeners();
    });

    it("should add RFA list and fire onRfaChanged event", function() {
        return adReviewApi.addRfAList(["0x000100250133"], "0x0144", 13)
        .then(tx => new Promise((resolve, err) => resolveWithEvent=resolve))
        .then(e => {
            assert.equal('onRfaChanged', e._name, 'unexpected event');
            assert.equal(1, e.rfaId, 'unexpected rdaId');
        });
    });

    it("should has exact one RfA deployed in state ACTIVE (=1)", function() {
        return adReviewApi.promiseRfas()
        .then( rfas => {
            assert.equal(1, rfas.length, 'unexpected rfas length');
            assert.equal(accounts[0], rfas[0][0], 'unexpected requester');
            assert.equal('0x0001', rfas[0][1].toString(16), 'unexpected actype');
            assert.equal('0x0025', rfas[0][2].toString(16), 'unexpected msn');
            assert.equal('133', rfas[0][3].toString(16), 'unexpected date_from');
            assert.equal('144', rfas[0][4].toString(16), 'unexpected date_to');
            assert.equal(13, rfas[0][5], 'unexpected num_of_reviews');
            assert.equal(1, rfas[0][6], 'unexpected state');
        });
    });

    it("should abort and change to ABORTED state", function() {
        return adReviewApi.abortRfA(1)
        .then(tx => new Promise((resolve, err) => resolveWithEvent=resolve))
        .then(e => {
            assert.equal('onRfaChanged', e._name, 'unexpected event');
            assert.equal(1, e.rfaId, 'unexpected rdaId');
            return adReviewApi.rfas(1);
        }).then(rfa => {
            assert.equal(2, rfa[6], 'unexpected state');
        });
    });
});
