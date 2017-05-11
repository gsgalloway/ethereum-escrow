// @flow
declare var artifacts: Artifacts;

let TrustlessEscrow = artifacts.require("TrustlessEscrow");

contract('agreementList', function(accounts: string[]): void {
    describe.skip("sendMoney");

    describe.skip("comfirmTransaction");

    describe.skip("cancelTransaction");
});


// export function sendMoney(transactionHash: string, position: string):ThunkAction {
//   return (dispatch) => {
//     // as always, return a spinner
//     dispatch(requestPending());
//     //TODO: need to add the correct reducers


//     return dispatch(sellerSendsMoney(transactionHash));
//   }
// }

// export function comfirmTransaction(transactionHash: string): ThunkAction {
//   return (dispatch) => {
//     dispatch(requestPending());
//     // check that the transaction was finished
//   }
// }

// export function cancelTransaction(transactionHash: string): ThunkAction {
//   return (dispatch) => {
//     dispatch(requestPending());
//     // check and then return

//   }
// }
