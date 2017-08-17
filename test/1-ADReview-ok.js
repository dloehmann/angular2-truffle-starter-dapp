const ADReview = artifacts.require("ADReview");
const adReviewApi = require("../src/app/adReviewApi.js")(ADReview);
const Promise = require("bluebird");

contract('ADReview', function(accounts) {
    before('init deployed objects', function(){
        return ADReview.deployed()
        .then(instance => instance.addRfAList(["0x000100250133"], "0x0144", 13));
    });

    it("should has RfAs deployed", function() {
        return adReviewApi.promiseRfas()
        .then( rfas => {
            console.log('rfas>', rfas);
        });
    });

    it("can abort rfa", function() {
        return adReviewApi.promiseRfas()
        .then( rfas => {
            console.log('rfas>', rfas);
        });
    });
});
