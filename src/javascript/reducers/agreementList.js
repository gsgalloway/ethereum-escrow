// @flow
import type {
  RequestPendingAction,
  BuyerSentAction,
  SellerSentAction,
  SendFailedAction,
  ConfirmedAction,
  ConfirmedFailedAction,
  AgreementCanceledAction,
  AgreementCancelFailedAction,
  SortAgreementListAction
} from '../actions/agreementList';

import type {
  AgreementListState,
  AgreementListType,
  AgreementType
} from '../types';

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

// remove this once we get better values
const PLACEHOLDER_AGREEMENT_ID: string = (123123412312412412).toString();

const INITIAL_STATE: AgreementListState = {
    agreementsById: {
      "123123412312412412": {
      creationDate: 1493690737487,
      position: "buyer",
      price: 1234,
      buyer: "123.12.23.21",
      seller: "1231.123.12.1231",
      buyerPaid: true,
      buyerPaidDate: 1493690737488,
      sellerPaid: true,
      sellerPaidDate: 1493690737497,
      agreementComplete: false,
      agreementCompleteDate: 0,
      error: "",
      canceled: false,
      canceledDate: 1493690737506,
      requestPending: false,
    },
      "123123412312412413": {
      creationDate: 1493690737488,
      position: "buyer",
      price: 1235,
      buyer: "123.12.23.21",
      seller: "1231.123.12.1231",
      buyerPaid: true,
      buyerPaidDate: 1493690737489,
      sellerPaid: true,
      sellerPaidDate: 1493690737496,
      agreementComplete: false,
      agreementCompleteDate: 0,
      error: "",
      canceled: false,
      canceledDate: 1493690737503,
      requestPending: false,
    },
  },
  allAgreementIds: ["123123412312412412","123123412312412413"],
  sortKey: "creationDate",
  sortKind: "descending",
};

// The logic for changing state either belongs here or in a thunk or sorted
// repeatedly in the container
// Descending: Date(New to Old), Price(Largest to smallest)
function sortAllAgreementIds(state: AgreementListState, sortKey: string, sortKind: "descending" | "ascending"): Array<string> {

  const allAgreementIds: Array<string> = state.allAgreementIds,
        agreementsById: AgreementListType = state.agreementsById;

  const sortedAgreements: Array<string> = allAgreementIds.sort((a, b) => {

    const aAgreement: string = agreementsById[a][sortKey];
    const bAgreement: string = agreementsById[b][sortKey];

    if (sortKind === "ascending") {
      if (aAgreement < bAgreement) return -1;
      else if (aAgreement > bAgreement) return 1;
      return 0;

    } else if (sortKind === "descending") {
      if (aAgreement > bAgreement) return -1;
      else if (aAgreement < bAgreement) return 1;
      return 0;
    };
    return 0;
  });

  return sortedAgreements;

};

export default function agreementListReducer(state: AgreementListState = INITIAL_STATE, action: Action): AgreementListState {
  // set agreementId, and check if payload passes an object with an error
  // or passes just the agreement int. This could be a very long

  let agreementId: string = '';
  let agreementsById: AgreementListType;
  let agreement: AgreementType;

  // flow really doesn't like this ternary operator, makes me super sad
  // if (action.payload) {
  //   agreementId =  typeof action.payload === 'object' ?  action.payload.agreementId.toString(): action.payload.toString();
  // }

  // REALLY ugly way of making sure that agreementId is in the object, is there
  // a better solution to this?

  if (typeof action.payload === 'object' && action.payload.agreementId) {
    //$FlowFixMe
    agreementId = action.payload.agreementId.toString();
  } else if (typeof action.payload === 'string') {
    agreementId = action.payload.toString();
  }
  if (agreementId !== '') {
    agreementsById = state.agreementsById;
    agreement = agreementsById[agreementId];
  }



  switch (action.type) {
    case 'REQUEST_PENDING':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            requestPending: true,
          }
        }
      }
    // send button
    case 'BUYER_SENT':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            buyerPaid: true,
            buyerPaidDate: Date.now(),
            error: "",
            requestPending: false,
          },
        }
      };
    case 'SELLER_SENT':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            senderPaid: true,
            senderPaidDate: Date.now(),
            error: "",
            requestPending: false,
          },
        }
      };
    case 'SEND_FAILED':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            error: "Sending your ether failed.",
            requestPending: false,
          },
        }
      };
    //confirmButton
    case 'CONFIRMED':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            transationComplete: true,
            transationCompleteDate: Date.now(),
            error: "",
            requestPending: false,
          },
        }
      };
    case 'CONFIRM_FAILED':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
            [agreementId]: {
            ...agreement,
            error: "Confirmation failed. Are you connected to the internet?",
            requestPending: false,
          },
        }
      };
    // cancel button
    case 'AGREEMENT_CANCELED':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            canceled: true,
            canceledDate: Date.now(),
            error: "",
            requestPending: false,
          },
        }
      };
    case 'AGREEMENT_CANCEL_FAILED':
      return {
        ...state,
        agreementsbyId: {
          ...agreementsById,
          [agreementId]: {
            ...agreement,
            error: "Cancellation failed",
            requestPending: false,
          }
        }
      }
    case 'AGREEMENT_LIST_SORT':
      const sortKey = action.payload.sortKey;
      const sortKind = action.payload.sortKind;
      const allAgreementIds: Array<string> = sortAllAgreementIds(state, sortKey, sortKind);
      return {
        ...state,
        sortKey: sortKey,
        sortKind: sortKind,
        allAgreementIds: allAgreementIds,
      };
    default:
      (action: empty);
      return state;
  }
}
