// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { sendMoney, confirmAgreement, cancelAgreement } from '../actions/agreementList';
import Agreement from '../components/agreement';
import type { AgreementListState, reduxStoreType } from '../types';
import type { AgreementListDispatch } from '../actions/agreementList';

class AgreementList extends Component {
  // map over all agreements using allAgreements as values
  // preferably, use some sort of sorting function to return
  // date, amount, as buyer, as seller, completed

  render() {
      return (
        <ul>
          <Agreement {...this.props} />
        </ul>
      );
    }
  };

  const mapStateToProps = (state: reduxStoreType): {agreementList: AgreementListState} => {
    const agreementList: AgreementListState = state.agreementList;
    return {
      agreementList
    };
  };

  // TODO: change the "any" return type here to something more specific
  // once we know what it looks like
  const mapDispatchToProps = (dispatch: AgreementListDispatch): any => {
    return {
      sendMoney: (agreementId: string, position: "buyer" | "seller"): void => {
        dispatch(sendMoney(agreementId, position));
      },
      confirmAgreement: (agreementId: string): void => {
        dispatch(confirmAgreement(agreementId));
      },
      cancelAgreement: (agreementId: string): void => {
        dispatch(cancelAgreement(agreementId));
      }
    }
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgreementList);
