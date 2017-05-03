// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { sendMoney, confirmTransaction, cancelTransaction } from '../actions/agreementList';
import Agreement from '../components/agreement';
import type { AgreementsType } from '../types';

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

  const mapStateToProps = (state) => {
    const allTransactions: Array<string> = state.agreementList.allTransactions;
    const agreements: AgreementsType = state.agreementList.agreements;
    return {
      allTransactions,
      agreements
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      sendMoney: (transactionHash, position) => {
        dispatch(sendMoney(transactionHash, position));
      },
      confirmTransaction: (transactionHash) => {
        dispatch(confirmTransaction(transactionHash));
      },
      cancelTransaction: (transactionHash) => {
        dispatch(cancelTransaction(transactionHash));
      }
    }
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgreementList);
