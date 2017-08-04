module.exports =  function(ADReview) {
    return {
        promiseAcSeries : function promiseAcSeries(){
           return ADReview.deployed()
           .then(adReview => adReview.rfaid()
               .then(maxRfaId => {
                  let rfas = [];
                  for(let i=1; i<maxRfaId; ++i) {
                      rfas.push(adReview.rfas(i));
                  }
                  return Promise.all(rfas);
                }))
           .then( rfas => rfas.map(e=>({id:e[1], msn:e[2]})));
        }
    }
}
