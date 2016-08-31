import React, { Component, PropTypes } from 'react';
import TrustlessEscrowContract from '../web3';
import CreateAgreementForm from '../components/CreateAgreementForm';
import { createContract } from '../actions/actions.js';


var onSubmit = function(buyer, seller, value) {
  // TODO: replace this with the current account
  var txOptions = {from: buyer.value};
};

export default class CreateAgreement extends Component {
  render() {
    return <CreateAgreementForm onSubmit={onSubmit}/>;
  }
};
