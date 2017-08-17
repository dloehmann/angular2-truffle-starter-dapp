const ADReview = artifacts.require("ADReview");
const adReviewApi = require("../src/app/adReviewApi.js")(ADReview);
const Promise = require("bluebird");
const BigNumber = require('bignumber.js');
const assert = require('assert');
module.exports = function(done) {
    return ADReview.deployed()
    .then(instance => instance.addRfAList(["0x000100250133"], "0x0144", 13))
    .then(tx => console.log(tx));
};
