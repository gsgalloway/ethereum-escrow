// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrustlessEscrowContract from '../web3';
import CreateAgreementForm from '../components/CreateAgreementForm';
import { createAgreement } from '../actions/createAgreement';
import type { reduxStoreType } from '../types';
import type { CreateAgreementDispatch } from '../actions/createAgreement';

type Props = {
  agreementPending: string,
  error: string,
}

class CreateAgreement extends Component {
  render() {
    return <CreateAgreementForm {...this.props} />;
  }
}

const mapStateToProps = (state: reduxStoreType): Props => {
  console.log(state);
  return {
    agreementPending: state.createAgreement.agreementPending,
    error: state.createAgreement.error
  }
};

// TODO: change the "any" return type here to something more specific

const mapDispatchToProps = (dispatch: CreateAgreementDispatch): any => {
  return {
    // TODO: replace this with the current account
    onFormSubmit: (buyer, seller, value, txOptions = {from: buyer}): void => {
      dispatch(createAgreement(buyer, seller, value, txOptions));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAgreement);
