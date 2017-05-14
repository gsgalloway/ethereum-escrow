// @flow
declare var artifacts: Artifacts;

let TrustlessEscrow = artifacts.require("TrustlessEscrow");

contract('createAgreement', function(accounts: string[]): void {
    describe.skip("createAgreementPending");

    describe.skip("createAgreementFulfilled");

    describe.skip("createAgreementFailed");

    describe.skip("createAgreement");
});


// export function createAgreementPending(): PendingAction {
//   return {
//     type: 'CREATE_AGREEMENT_PENDING'
//   };
// }

// export function createAgreementFulfilled(transactionHash: string): FulfilledAction {
//   return {
//     type: 'CREATE_AGREEMENT_FULFILLED',
//     payload: transactionHash
//   };
// }

// export function createAgreementFailed(error: string): FailedAction{
//   return {
//     type: 'CREATE_AGREEMENT_FAILED',
//     payload: error
//   };
// }

// // transaction options will be "any" for now
// export function createAgreement(buyer: string, seller: string, price: string, txOptions: any): ThunkAction {

//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.

//   return function (dispatch) {

//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.

//     dispatch(createAgreementPending());

//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.

//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.
//     return TrustlessEscrow.deployed()
//       .then(escrowContract => escrowContract.createAgreement(buyer, seller, price, txOptions))
//       .then(txHash => dispatch(createAgreementFulfilled(txHash)))
//       .catch(e => dispatch(createAgreementFailed(e)));
//   }
// }