import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import TrustlessEscrowContract from '../web3';
import CreateAgreementForm from '../components/CreateAgreementForm';
import { createContract } from '../actions';


const mapStateToProps = (state) => {
  return {
    agreementPending: state.createAgreement.agreementPending,
    error: state.createAgreement.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: replace this with the current account
    onSubmit: (buyer, seller, value, txOptions = {from: buyer}) => {
      dispatch(createContract(buyer, seller, value, txOptions))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAgreementForm);
