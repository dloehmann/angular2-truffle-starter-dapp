const ADReview = artifacts.require("ADReview");
const Promise = require("bluebird");
const adReviewApi = require("../src/app/adReviewApi.js")(ADReview);

contract('utility', function(accounts) {

    it("should compact RFA list into solidity arg", function() {
        let arg_data = (adReviewApi.compactRfaList([{
            actypeId:0x0001,
            msn: 0x0025,
            dateFrom: 0x0133}]));
        assert.equal(1, arg_data.length, 'unexpected compacted data length');
        assert.equal('0x000100250133', arg_data[0], 'unexpected compacted data');
    });

});
