const ConvertLib = artifacts.require("./ConvertLib.sol");
const MetaCoin = artifacts.require("./MetaCoin.sol");
const ADReview = artifacts.require("ADReview");
const AviaC01n = artifacts.require("AviaC01n");
const Promise = require("bluebird");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);
    return Promise.all([
      deployer.deploy(AviaC01n),
      deployer.deploy(ADReview).then(tx => ADReview.deployed())
      .then(instance => {
          return instance.addRfAList(["0x000100250133"], "0x0144", 13);
      })
    ]).spread((tx1, tx2) => {
      console.log(tx1,tx2);
    });
};
