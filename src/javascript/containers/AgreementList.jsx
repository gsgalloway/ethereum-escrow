// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { sendMoney, confirmTransaction, cancelTransaction } from '../actions/agreementList';
import Agreement from '../components/agreement';
import type { AgreementListType ,AgreementsType, reduxStoreType } from '../types';
import type { AgreementListDispatch } from '../actions/agreementList';

class AgreementList extends Component {
  // map over all agreements using allTransactions as values
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

  const mapStateToProps = (state: reduxStoreType): AgreementListType => {
    console.log(state);
    const agreements: AgreementsType = state.agreementList.agreements;
    return {
      agreements
    };
  };

  // TODO: change the "any" return type here to something more specific
  // once we know what it looks like
  const mapDispatchToProps = (dispatch: AgreementListDispatch): any => {
    return {
      sendMoney: (transactionHash: string, position: string): void => {
        dispatch(sendMoney(transactionHash, position));
      },
      confirmTransaction: (transactionHash: string): void => {
        dispatch(confirmTransaction(transactionHash));
      },
      cancelTransaction: (transactionHash: string): void => {
        dispatch(cancelTransaction(transactionHash));
      }
    }
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgreementList);
