var TrustlessEscrow = artifacts.require("./TrustlessEscrow.sol");

module.exports = function(deployer) {
  deployer.deploy(TrustlessEscrow);
};
