// @flow
import trustlessEscrowContract from '../web3';
(trustlessEscrowContract: Contract<TrustlessEscrowInstance>);

export type RequestPendingAction = { type: 'REQUEST_PENDING', payload: number  };
export type BuyerSentAction = { type: 'BUYER_SENT', payload: number };
export type SellerSentAction = { type: 'SELLER_SENT', payload: number };
export type SendFailedAction = { type: 'SEND_FAILED', payload: {agreementId: number, error: any} };
export type ConfirmedAction = { type: 'CONFIRMED', payload: number };
export type ConfirmedFailedAction = { type: 'CONFIRM_FAILED', payload: number };
export type AgreementCanceledAction = { type: 'AGREEMENT_CANCELED', payload: number };
export type AgreementCancelFailedAction = { type: 'AGREEMENT_CANCEL_FAILED', payload: number };

type Action =
  | RequestPendingAction
  | BuyerSentAction
  | SellerSentAction
  | SendFailedAction
  | ConfirmedAction
  | ConfirmedFailedAction
  | AgreementCanceledAction
  | AgreementCancelFailedAction;

export type AgreementListDispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: AgreementListDispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

function requestPending(agreementId: number): RequestPendingAction {
  return {
    type: 'REQUEST_PENDING',
    payload: agreementId,
  }
}

// TODO: combine copy-pasted code from buyerSendsMoney and sellerSendsMoney
function buyerSendsMoney(agreementId: number): ThunkAction {
  return function (dispatch) {
    return trustlessEscrowContract.deployed().then((instance: TrustlessEscrowInstance) => {
      let buyersCost;
      return instance.agreements.call(agreementId)
          .then((agreementStruct: any[]) => {
            buyersCost = agreementStruct[2].times(2);
          })
          .then(() => instance.buyerConfirmsAgreement(agreementId, {value: buyersCost}))
          .then(() => {return {type: 'BUYER_SENT', payload: agreementId}})
          .catch((e) => dispatch(sendingMoneyFailed(agreementId)))
      });
  }
}
function sellerSendsMoney(agreementId: number, error: any): ThunkAction {
  return function (dispatch) {
    return trustlessEscrowContract.deployed().then((instance: TrustlessEscrowInstance) => {
      let sellersCost;
      return instance.agreements.call(agreementId)
          .then((agreementStruct: any[]) => {
            sellersCost = agreementStruct[2];
          })
          .then(() => instance.sellerConfirmsAgreement(agreementId, {value: sellersCost}))
          .then(() => {return {type: 'SELLER_SENT', payload: agreementId}})
          .catch((e) => dispatch(sendingMoneyFailed(agreementId)))
      });
  }
}
function sendingMoneyFailed(agreementId: number, error: any): SendFailedAction {
  return {
    type: 'SEND_FAILED',
    payload: {
      agreementId,
      error
    }
  }
}
export function sendMoney(agreementId: number, position: "buyer" | "seller"):ThunkAction {
  return (dispatch) => {
    // as always, return a spinner
    dispatch(requestPending(agreementId));
    //TODO: need to add the correct reducers

    if (position === "buyer")
      return dispatch(buyerSendsMoney(agreementId));
    else
      return dispatch(sellerSendsMoney(agreementId));
  }
}
function confirmAgreementSuccess(agreementId: number): ConfirmedAction {
  return {
    type: 'CONFIRMED',
    payload: agreementId,
  }
}
function confirmAgreementFailed(agreementId: number): ConfirmedFailedAction {
  return {
    type: 'CONFIRM_FAILED',
    payload: agreementId,
  }
}
export function confirmAgreement(agreementId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending(agreementId));
    // check that the transaction was finished
  }
}

function canceledAgreement(agreementId: number): AgreementCanceledAction {
  return {
    type: 'AGREEMENT_CANCELED',
    payload: agreementId,
  }
}
function cancelAgreementFailed(agreementId: number): AgreementCancelFailedAction {
  return {
    type: 'AGREEMENT_CANCEL_FAILED',
    payload: agreementId,
  }
}
export function cancelAgreement(agreementId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending(agreementId));
    // check and then return

  }
}
