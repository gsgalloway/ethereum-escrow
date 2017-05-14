// @flow
import trustlessEscrowContract from '../web3';
(trustlessEscrowContract: Contract<TrustlessEscrowInstance>);

export type PendingAction = { type: 'CREATE_AGREEMENT_PENDING' };
export type FulfilledAction = { type: 'CREATE_AGREEMENT_FULFILLED', payload: string };
export type FailedAction = { type: 'CREATE_AGREEMENT_FAILED', payload: string };

// this is included in the documentation, but not referenced anywhere
type Action =
  | PendingAction
  | FulfilledAction
  | FailedAction;
// taken from flow documentation
// probably will slim this down once
// I understand redux-thunk better
export type CreateAgreementDispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: CreateAgreementDispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

export function createAgreementPending(): PendingAction {
  return {
    type: 'CREATE_AGREEMENT_PENDING'
  };
}

export function createAgreementFulfilled(agreementId: string): FulfilledAction {
  return {
    type: 'CREATE_AGREEMENT_FULFILLED',
    payload: agreementId
  };
}

export function createAgreementFailed(error: string): FailedAction{
  return {
    type: 'CREATE_AGREEMENT_FAILED',
    payload: error
  };
}

// agreement options will be "any" for now
export function createAgreement(buyer: string, seller: string, price: number, txOptions: any): ThunkAction {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(createAgreementPending());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return trustlessEscrowContract.deployed()
      .then((instance: TrustlessEscrowInstance) => instance.createAgreement(buyer, seller, price, txOptions))
      .then((txResult: TransactionResult) => dispatch(createAgreementFulfilled(txResult.tx)))
      .catch((e: string) => dispatch(createAgreementFailed(e)));
  }
}
