// @flow
import { getTrustlessEscrowContract } from '../web3';

export type RequestPendingAction = { type: 'REQUEST_PENDING', payload: string  };
export type BuyerSentAction = { type: 'BUYER_SENT', payload: {agreementId: number, timestamp: number} };
export type SellerSentAction = { type: 'SELLER_SENT', payload: {agreementId: number, timestamp: number} };
export type SendFailedAction = { type: 'SEND_FAILED', payload: {agreementId: number, error: any} };
export type ConfirmedAction = { type: 'CONFIRMED', payload: {agreementId: number, timestamp: number} };
export type ConfirmedFailedAction = { type: 'CONFIRM_FAILED', payload: number };
export type AgreementCanceledAction = { type: 'AGREEMENT_CANCELED', payload: {agreementId: number, timestamp: number} };
export type AgreementCancelFailedAction = { type: 'AGREEMENT_CANCEL_FAILED', payload: number };
export type SortAgreementListAction = { type: 'AGREEMENT_LIST_SORT', payload: {sortKey: string, sortKind: "ascending" | "descending"}}

type Action =
  | RequestPendingAction
  | BuyerSentAction
  | SellerSentAction
  | SendFailedAction
  | ConfirmedAction
  | ConfirmedFailedAction
  | AgreementCanceledAction
  | AgreementCancelFailedAction
  | SortAgreementListAction;

export type AgreementListDispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: AgreementListDispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

function requestPending(agreementId: string): RequestPendingAction {
  return {
    type: 'REQUEST_PENDING',
    payload: agreementId,
  }
}

// TODO: combine copy-pasted code from buyerSendsMoney and sellerSendsMoney
function buyerSendsMoney(agreementId: number): ThunkAction {
  return function (dispatch) {
    return getTrustlessEscrowContract().deployed().then((instance: TrustlessEscrowInstance) => {
      let buyersCost;
      // TODO: Need to pass timestamp
      return instance.agreements.call(agreementId)
          .then((agreementStruct: any[]) => {
            buyersCost = agreementStruct[2].times(2);
          })
          .then(() => instance.buyerConfirmsAgreement(agreementId, {value: buyersCost}))
          .then(() => {return {type: 'BUYER_SENT', payload: {agreementId: agreementId, timestamp: timestamp}}})
          .catch((e) => dispatch(sendingMoneyFailed(agreementId)))
      });
  }
}
function sellerSendsMoney(agreementId: number, error: any): ThunkAction {
  return function (dispatch) {
    return getTrustlessEscrowContract().deployed().then((instance: TrustlessEscrowInstance) => {
      let sellersCost;
      // TODO: Need to pass timestamp
      return instance.agreements.call(agreementId)
          .then((agreementStruct: any[]) => {
            sellersCost = agreementStruct[2];
          })
          .then(() => instance.sellerConfirmsAgreement(agreementId, {value: sellersCost}))
          .then(() => {return {type: 'SELLER_SENT', payload: {agreementId: agreementId, timestamp: timestamp}}})
          .catch((e) => dispatch(sendingMoneyFailed(agreementId)))
      });
  }
}
function sendingMoneyFailed(agreementId: number, error: any): SendFailedAction {
  return {
    type: 'SEND_FAILED',
    payload: {
      agreementId: agreementId,
      error: error
    }
  }
}
export function sendMoney(agreementId: string, position: "buyer" | "seller"):ThunkAction {
  // convert agreementId to number
  const _agreementId: number = Number(agreementId);

  return (dispatch) => {
    // as always, return a spinner
    dispatch(requestPending(agreementId));
    //TODO: need to add the correct reducers

    if (position === "buyer")
      return dispatch(buyerSendsMoney(_agreementId));
    else
      return dispatch(sellerSendsMoney(_agreementId));
  }
}
function confirmAgreementSuccess(agreementId: number, timestamp: number): ConfirmedAction {
  return {
    type: 'CONFIRMED',
    payload: {
      agreementId: agreementId,
      timestamp: timestamp
    },
  }
}
function confirmAgreementFailed(agreementId: number): ConfirmedFailedAction {
  return {
    type: 'CONFIRM_FAILED',
    payload: agreementId,
  }
}
export function confirmAgreement(agreementId: string): ThunkAction {
  // convert agreementId to number
  const _agreementId: number = Number(agreementId);

  return (dispatch) => {
    dispatch(requestPending(agreementId));
    // check that the transaction was finished
  }
}

function canceledAgreement(agreementId: number): AgreementCanceledAction {
  return {
    type: 'AGREEMENT_CANCELED',
    payload: {
      agreementId: agreementId,
      timestamp: timestamp
    },
  }
}
function cancelAgreementFailed(agreementId: number): AgreementCancelFailedAction {
  return {
    type: 'AGREEMENT_CANCEL_FAILED',
    payload: agreementId,
  }
}
export function cancelAgreement(agreementId: string): ThunkAction {
  // convert agreementId to number
  const _agreementId: number = Number(agreementId);

  return (dispatch) => {
    dispatch(requestPending(agreementId));
    // check and then return
    // TODO: Need to pass timestamp to canceledAgreement

  }
}

export function sortAgreements(sortKey: string, sortKind: "ascending" | "descending"): SortAgreementListAction {
  return {
    type: 'AGREEMENT_LIST_SORT',
    payload: {
      sortKey: sortKey,
      sortKind: sortKind,
    }
  }
}
