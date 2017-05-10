export type RequestPendingAction = { type: 'REQUEST_PENDING' };
export type BuyerSentAction = { type: 'BUYER_SENT', payload: string };
export type SellerSentAction = { type: 'SELLER_SENT', payload: string };
export type SendFailedAction = { type: 'SEND_FAILED', payload: string };
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
function buyerSendsMoney(transactionHash: string): BuyerSentAction {
  return {
    type: 'BUYER_SENT',
    payload: transactionHash,
  }
}
function sellerSendsMoney(transactionHash: string): SellerSentAction {
  return {
    type: 'SELLER_SENT',
    payload: transactionHash,
  }
}
function sendingMoneyFailed(transactionHash: string): SendFailedAction {
  return {
    type: 'SEND_FAILED',
    payload: transactionHash,
  }
}
export function sendMoney(transactionHash: string, position: string):ThunkAction {
  return (dispatch) => {
    // as always, return a spinner
    dispatch(requestPending());
    //TODO: need to add the correct reducers


    return dispatch(sellerSendsMoney(transactionHash));
  }
}
function confirmTransactionSuccess(transactionHash: string): ConfirmedAction {
  return {
    type: 'CONFIRMED',
    payload: transactionHash,
  }
}
function confirmTransactionFailed(transactionHash: string): ConfirmedFailedAction {
  return {
    type: 'CONFIRM_FAILED',
    payload: transactionHash,
  }
}
export function comfirmTransaction(transactionHash: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending());
    // check that the transaction was finished
  }
}

function canceledTransaction(transactionHash: string): TransactionCanceledAction {
  return {
    type: 'TRANSACTION_CANCELED',
    payload: transactionHash,
  }
}
function cancelTransactionFailed(transactionHash: string): TransactionCancelFailedAction {
  return {
    type: 'TRANSACTION_CANCEL_FAILED',
    payload: transactionHash,
  }
}
export function cancelTransaction(transactionHash: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestPending());
    // check and then return

  }
}
