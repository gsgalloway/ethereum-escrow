// TODO: import TrustedEscrow

export const CREATE_CONTRACT_PENDING = 'CREATE_CONTRACT_PENDING';
export const CREATE_CONTRACT_FULFILLED = 'CREATE_CONTRACT_FULFILLED';
export const CREATE_CONTRACT_FAILED = 'CREATE_CONTRACT_FAILED';

export function createContractPending() {
  return {
    type: CREATE_CONTRACT_PENDING
  };
}

export function createContractFulfilled(transactionHash) {
  return {
    type: CREATE_CONTRACT_FULFILLED,
    transactionHash
  };
}

export function createContractFailed(error){
  return {
    type: CREATE_CONTRACT_FAILED,
    error
  }
}


export function createContract(buyer, seller, price, txOptions) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(createContractPending());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return TrustlessEscrow.deployed().createContract(buyer, seller, price, txOptions)
      .then(txHash => dispatch(createContractFulfilled(txHash)))
      .catch(e => dispatch(createContractFailed(e)));
  }
}
