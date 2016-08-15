require("../stylesheets/app.css");
import React, { Component, PropTypes } from 'react';
var Web3 = require("web3");
import App from '../components/App/App.jsx';
var ReactDOM = require('react-dom');

var accounts;
var account;
var balance;
var web3;

// web3 setup
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
}

TrustlessEscrow.setProvider(web3.currentProvider);
MetaCoin.setProvider(web3.currentProvider);

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    ReactDOM.render(
      <App />,
      document.getElementById('content')
    );
  });
  window.web3 = web3;
  window.TrustlessEscrow = TrustlessEscrow;
}
