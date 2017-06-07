// @flow
import trustlessEscrowContract from '../web3';
(trustlessEscrowContract: Contract<TrustlessEscrowInstance>);

export type RequestPendingAction = { type: 'REQUEST_PENDING', payload: string  };
export type BuyerSentAction = { type: 'BUYER_SENT', payload: {agreementId: number, timestamp: number} };
export type SellerSentAction = { type: 'SELLER_SENT', payload: {agreementId: number, timestamp: number} };
export type SendFailedAction = { type: 'SEND_FAILED', payload: {agreementId: number, error: any} };
export type ConfirmedAction = { type: 'CONFIRMED', payload: {agreementId: number, timestamp: number} };
export type ConfirmedFailedAction = { type: 'CONFIRM_FAILED', payload: number };
export type AgreementCanceledAction = { type: 'AGREEMENT_CANCELED', payload: {agreementId: number, timestamp: number} };
export type AgreementCancelFailedAction = { type: 'AGREEMENT_CANCEL_FAILED', payload: number };
export type SortAgreementListAction = { type: 'AGREEMENT_LIST_SORT', payload: {sortKey: string, sortKind: "ascending" | "descending"}};

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

function buyerSendsMoney(agreementId: number, timestamp: any): BuyerSentAction {
  return {
    type: 'BUYER_SENT', 
    payload: {
      agreementId: agreementId, 
      timestamp: timestamp
    }
  }
}

function sellerSendsMoney(agreementId: number, timestamp: any): SellerSentAction {
 return {
   type: 'SELLER_SENT', 
    payload: {
      agreementId: agreementId, 
      timestamp: timestamp
    }
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
    // return a spinner
    dispatch(requestPending(agreementId));

    return (dispatch) => {
      return trustlessEscrowContract.deployed().then((instance: TrustlessEscrowInstance) => {
        // assign a generic cost TODO: assign correct value
        let userCost: any;
        // TODO: Need to pass timestamp
        return instance.agreements.call(agreementId).then(
          (agreementStruct: any[]) => {
            userCost = agreementStruct[2].times(2);
          })
          .then(() => {
            // this is where we check by party, then dispatch the correct action if there is no error
            if (position === "buyer") { 
              instance.sellerConfirmsAgreement(agreementId, {value: userCost})
              .then(() => {
                dispatch(buyerSendsMoney(_agreementId, timestamp));
              });
            } else if (position === "seller") {
              instance.buyerConfirmsAgreement(agreementId, {value: userCost})
              .then(() => {
                dispatch(sellerSendsMoney(_agreementId, timestamp));
              });
            }
          })
          .catch((e) => dispatch(sendingMoneyFailed(agreementId)));
      });
    }
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
