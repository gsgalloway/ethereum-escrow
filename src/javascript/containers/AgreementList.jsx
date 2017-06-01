// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { sendMoney, confirmAgreement, cancelAgreement, sortAgreements } from '../actions/agreementList';
import Agreement from '../components/Agreement';
import AgreementListNav from '../components/AgreementListNav';
import type { AgreementType, AgreementListType, AgreementListState, reduxStoreType } from '../types';
import type { AgreementListDispatch } from '../actions/agreementList';

type Props = {
  allAgreementIds: Array<string>,
  agreementsById: AgreementListType,
  sortKey: string,
  sortKind: "descending" | "ascending",
};

class AgreementList extends Component {
  constuctor() {
    const self: Object = this;

  }
  // map over all agreements using allAgreements as values
  // preferably, use some sort of sorting function to return
  // date, amount, as buyer, as seller, completed

  // also, date ascending is going to be most recent at top


  render() {
    const agreementList = this.props.allAgreementIds.map((agreementId: string) => {
      const agreement: AgreementType = this.props.agreementsById[agreementId];
      return(
        <Agreement
          agreementId={agreementId}
          {...agreement}
          key={'agreement-' + agreementId}
          sendMoney={this.props.sendMoney}
          confirmAgreement={this.props.confirmAgreement}
          cancelAgreement={this.props.cancelAgreement}
        />
      );
    });

    return (
        <div>
          <AgreementListNav
            sortKey={this.props.sortKey}
            sortKind={this.props.sortKind}
            sortAgreements={this.props.sortAgreements}
          />
          {agreementList}
        </div>
    );
  }
};

  const mapStateToProps = (state: reduxStoreType): Props => {

    const agreementListObj: AgreementListState = state.agreementList,
          allAgreementIds: Array<string> = agreementListObj.allAgreementIds,
          agreementsById: AgreementListType = agreementListObj.agreementsById,
          sortKey: string = agreementListObj.sortKey,
          sortKind: "descending" | "ascending" = agreementListObj.sortKind;

    return {
      allAgreementIds,
      agreementsById,
      sortKey,
      sortKind
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
      },
      sortAgreements: (sortKey: string, sortKind: "ascending" | "descending"): void => {
        dispatch(sortAgreements(sortKey, sortKind));
      }
    }
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgreementList);
