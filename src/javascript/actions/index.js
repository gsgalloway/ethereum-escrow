import TrustlessEscrow from '../web3';
import {
    CREATE_AGREEMENT_PENDING,
    CREATE_AGREEMENT_FULFILLED,
    CREATE_AGREEMENT_FAILED
  } from '../constants';

export function createAgreementPending() {
  return {
    type: CREATE_AGREEMENT_PENDING
  };
}

export function createAgreementFulfilled(transactionHash) {
  return {
    type: CREATE_AGREEMENT_FULFILLED,
    transactionHash
  };
}

export function createAgreementFailed(error){
  return {
    type: CREATE_AGREEMENT_FAILED,
    error
  };
}


export function createAgreement(buyer, seller, price, txOptions) {

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
    return TrustlessEscrow.deployed()
      .then(escrowContract => escrowContract.createAgreement(buyer, seller, price, txOptions))
      .then(txHash => dispatch(createAgreementFulfilled(txHash)))
      .catch(e => dispatch(createAgreementFailed(e)));
  }
}
