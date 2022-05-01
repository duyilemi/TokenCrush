const TokenCrush = artifacts.require("TokenCrush");

module.exports = function(deployer) {
  deployer.deploy(TokenCrush);
};
