module.exports =  function(ADReview) {
    return {
        promiseRfas : function promiseRfas() {
            return ADReview.deployed()
                .then(adReview => adReview.rfaid()
                    .then(maxRfaId => {
                        let rfas = [];
                        for(let i=1; i<=maxRfaId; ++i) {
                            rfas.push(adReview.rfas(i));
                        }
                        return Promise.all(rfas);
                     }))
        }
    }
}
