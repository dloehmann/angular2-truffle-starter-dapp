module.exports =  function(ADReview) {
    let activeFilters = [];
    function _compactRfaList(rfasList) {
      let pad4 = s => ('0000' + s).substring(0, 4 - s.length) + s;
      return rfasList.map((e,i) =>
         '0x' + pad4(e.actypeId.toString(16))
          + pad4(e.msn.toString(16))
          + pad4(e.dateFrom.toString(16))
      );
    }
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

        rfas : function rfas(rfaId) {
            return ADReview.deployed()
                .then(adReview => adReview.rfas(rfaId));
        },

        abortRfA : function abortRfA(rfaId) {
            return ADReview.deployed()
                .then(adReview => adReview.abortRfA(rfaId));
        },

        compactRfaList : _compactRfaList,

        addRfAList : function addRfAList(rfasList, valid_until, numOfReviews) {
            let rfas_data = _compactRfaList(rfasList);
            return ADReview.deployed()
                .then(adReview => adReview.addRfAList(rfas_data, valid_until, numOfReviews));
        },

        initEventListeners : function initEventListeners(callbacks) {
            return ADReview.deployed()
            .then(adReview => {
                console.log('initEventListeners');
                (activeFilters[0]=adReview.RfaChanged())
                    .watch((err,evtRfaChanged) => callbacks.onRfaChanged(evtRfaChanged.args));
                (activeFilters[1]=adReview.NewADNote())
                    .watch((err,evtNewADNote) => callbacks.onNewADNote(evtNewADNote.args));
                (activeFilters[2]=adReview.NewAssignmentAnnonce())
                    .watch((err,evtNewAssignmentAnnonce) => callbacks.onNewAssignmentAnnonce(evtNewAssignmentAnnonce.args));
                (activeFilters[3]=adReview.NewAssignment())
                    .watch((err,evtNewAssignment) => callbacks.onNewAssignment(evtNewAssignment.args));
                (activeFilters[4]=adReview.AssignmentDepositClaimed())
                    .watch((err,evtAssignmentDepositClaimed) => callbacks.onAssignmentDepositClaimed(evtAssignmentDepositClaimed.args));
                (activeFilters[5]=adReview.CorrectAssignmentDetermined())
                    .watch((err,evtCorrectAssignmentDetermined) => callbacks.onCorrectAssignmentDetermined(evtCorrectAssignmentDetermined.args));
                return adReview;
            }
          );
        },

        detachEventListeners : function detachEventListeners() {
            return Promise.all(activeFilters.map(e=>e.stopWatching()));
        }
    }
}
