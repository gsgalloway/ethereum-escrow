import trustlessEscrowContract from '../web3';
(trustlessEscrowContract: Contract<TrustlessEscrowInstance>);

export type RequestPendingAction = { type: 'REQUEST_PENDING' };
export type BuyerSentAction = { type: 'BUYER_SENT', payload: string };
export type SellerSentAction = { type: 'SELLER_SENT', payload: string };
export type SendFailedAction = { type: 'SEND_FAILED', payload: {agreementId: number, error: any} };
export type ConfirmedAction = { type: 'CONFIRMED', payload: string };
export type ConfirmedFailedAction = { type: 'CONFIRM_FAILED', payload: string };
export type TransactionCanceledAction = { type: 'TRANSACTION_CANCELED', payload: string };
export type TransactionCancelFailedAction = { type: 'TRANSACTION_CANCEL_FAILED', payload: string };

type Action =
  | BuyerSentAction
  | SellerSentAction
  | SendFailedAction
  | ConfirmedAction
  | ConfirmedFailedAction
  | TransactionCanceledAction
  | TransactionCancelFailedAction;

export type AgreementListDispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: AgreementListDispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

function requestPending(): RequestPendingAction {
  return {
    type: 'REQUEST_PENDING'
  }
}

// TODO: combine copy-pasted code from buyerSendsMoney and sellerSendsMoney
function buyerSendsMoney(agreementId: number): BuyerSentAction {
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
function sellerSendsMoney(agreementId: number, error: any): SellerSentAction {
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
    dispatch(requestPending());
    //TODO: need to add the correct reducers

    if (position === "buyer")
      return dispatch(buyerSendsMoney(agreementId));
    else
      return dispatch(sellerSendsMoney(agreementId));
  }
}
function confirmTransactionSuccess(agreementId: number): ConfirmedAction {
  return {
    type: 'CONFIRMED',
    payload: agreementId,
  }
}
function confirmTransactionFailed(agreementId: number): ConfirmedFailedAction {
  return {
    type: 'CONFIRM_FAILED',
    payload: agreementId,
  }
}
export function comfirmTransaction(agreementId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending());
    // check that the transaction was finished
  }
}

function canceledTransaction(agreementId: number): TransactionCanceledAction {
  return {
    type: 'TRANSACTION_CANCELED',
    payload: agreementId,
  }
}
function cancelTransactionFailed(agreementId: number): TransactionCancelFailedAction {
  return {
    type: 'TRANSACTION_CANCEL_FAILED',
    payload: agreementId,
  }
}
export function cancelTransaction(agreementId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending());
    // check and then return

  }
}
