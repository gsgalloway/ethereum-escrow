// @flow
import type {
  RequestPendingAction,
  BuyerSentAction,
  SellerSentAction,
  SendFailedAction,
  ConfirmedAction,
  ConfirmedFailedAction,
  AgreementCanceledAction,
  AgreementCancelFailedAction
} from '../actions/agreementList';

import type {
  AgreementListState,
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
  | AgreementCancelFailedAction;

// remove this once we get better values
const PLACEHOLDER_AGREEMENT_ID: string = (123123412312412412).toString();


const INITIAL_STATE: AgreementListState = {
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
  allAgreementIds: ["123123412312412412"],
};

export default function agreementListReducer(state: AgreementListState = INITIAL_STATE, action: Action): AgreementListState {
  // set agreementId, and check if payload passes an object with an error
  // or passes just the agreement int. This could be a very long

  let agreementId: string = '';

  // flow really doesn't like this ternary operator, makes me super sad
  // if (action.payload) {
  //   agreementId =  typeof action.payload === 'object' ?  action.payload.agreementId.toString(): action.payload.toString();
  // }

  if (typeof action.payload === 'object') {
    agreementId = action.payload.agreementId.toString();
  } else if (action.payload) {
    agreementId = action.payload.toString();
  }

  const agreement: AgreementType = state[agreementId];

  switch (action.type) {
    case 'REQUEST_PENDING':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          requestPending: true,
        }
      }
    // send button
    case 'BUYER_SENT':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          buyerPaid: true,
          buyerPaidDate: Date.now(),
          error: "",
          requestPending: false,
        },
      };
    case 'SELLER_SENT':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          senderPaid: true,
          senderPaidDate: Date.now(),
          error: "",
          requestPending: false,
        },
      };
    case 'SEND_FAILED':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          error: "Sending your ether failed.",
          requestPending: false,
        },
      };
    //confirmButton
    case 'CONFIRMED':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          transationComplete: true,
          transationCompleteDate: Date.now(),
          error: "",
          requestPending: false,
        },
      };
    case 'CONFIRM_FAILED':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          error: "Confirmation failed. Are you connected to the internet?",
          requestPending: false,
        },
      };
    // cancel button
    case 'AGREEMENT_CANCELED':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          canceled: true,
          canceledDate: Date.now(),
          error: "",
          requestPending: false,
        },
      };
    case 'AGREEMENT_CANCEL_FAILED':
      return {
        ...state,
        [agreementId]: {
          ...agreement,
          error: "Cancellation failed",
          requestPending: false,
        }
      }
    default:
      (action: empty);
      return state;
  }
}
