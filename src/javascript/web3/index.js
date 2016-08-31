import Web3 from "web3";

var _web3Instance;

// web3 setup
if (typeof web3 !== 'undefined') {
  _web3Instance = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  _web3Instance = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
}

_web3Instance.eth.getAccounts(function(err, accs) {
  if (err != null) {
    alert("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }
});

TrustlessEscrow.setProvider(_web3Instance.currentProvider);

// TODO: Remove these two lines
window.web3 = _web3Instance;
window.TrustlessEscrow = TrustlessEscrow;

export default TrustlessEscrow;
