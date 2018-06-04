import Web3 from "web3";
import { default as contract } from 'truffle-contract'
import trustless_escrow_artifacts from '../../../build/contracts/TrustlessEscrow.json'


var _web3Instance;

// web3 setup
if (typeof web3 !== 'undefined') {
  _web3Instance = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  _web3Instance = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

_web3Instance.eth.getAccounts(function(err, accs) {
  if (err != null) {
    alert("There was an error fetching your accounts. Are you using a web3 compatible browser?");
    return;
  }

  if (accs.length == 0) {
    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }
});

var TrustlessEscrow = contract(trustless_escrow_artifacts);

TrustlessEscrow.setProvider(_web3Instance.currentProvider);

// TODO: Remove these two lines
// window.web3 = _web3Instance;
// window.TrustlessEscrow = TrustlessEscrow;

export default TrustlessEscrow;
