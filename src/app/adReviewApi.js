module.exports =  function(ADReview) {
    return {
        promiseRfas : function promiseRfas() {
            return ADReview.deployed()
                .then(adReview => adReview.maxRfaId()
                    .then(maxRfaId => {
                        let rfas = [];
                        for(let i=1; i<=maxRfaId; ++i) {
                            rfas.push(adReview.rfas(i));
                        }
                        return Promise.all(rfas);
                     }))
        },

        abortRfa : function abortRfa() {
            return ADReview.deployed()
                .then(adReview => adReview.abortRfa());
        },

        initEventListeners : function initEventListeners(callbacks) {
            return ADReview.deployed()
            .then(adReview => Promise.all([
                adReview.RfaChanged()
                    .then(evtRfaChanged => callbacks.onRfaChanged(evtRfaChanged)),
                adReview.NewADNote()
                    .then(evtNewADNote => callbacks.onNewADNote(evtNewADNote)),
                adReview.NewAssignmentAnnonce()
                    .then(evtNewAssignmentAnnonce => callbacks.onNewAssignmentAnnonce(evtNewAssignmentAnnonce)),
                adReview.NewAssignment()
                    .then(evtNewAssignment => callbacks.onNewAssignment(evtNewAssignment)),
                adReview.AssignmentDepositClaimed()
                    .then(evtAssignmentDepositClaimed => callbacks.onAssignmentDepositClaimed(evtAssignmentDepositClaimed)),
                adReview.CorrectAssignmentDetermined()
                    .then(evtCorrectAssignmentDetermined => callbacks.onCorrectAssignmentDetermined(evtCorrectAssignmentDetermined))
            ]));
        }
    }
}
