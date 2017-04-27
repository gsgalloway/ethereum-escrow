// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import TrustlessEscrowContract from '../web3';
import CreateAgreementForm from '../components/CreateAgreementForm';
import { createAgreement } from '../actions';

class CreateAgreement extends Component {
  render() {
    return <CreateAgreementForm {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    agreementPending: state.createAgreement.agreementPending,
    error: state.createAgreement.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: replace this with the current account
    onFormSubmit: (buyer, seller, value, txOptions = {from: buyer}) => {
      dispatch(createAgreement(buyer, seller, value, txOptions))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAgreement);
