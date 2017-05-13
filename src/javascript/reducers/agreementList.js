// @flow
import type {
  RequestPendingAction,
  BuyerSentAction,
  SellerSentAction,
  SendFailedAction,
  ConfirmedAction,
  ConfirmedFailedAction,
  TransactionCanceledAction,
  TransactionCancelFailedAction
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
  | TransactionCanceledAction
  | TransactionCancelFailedAction;

// remove this once we get better values
const PLACEHOLDER_AGREEMENT_ID: string = (123123412312412412).toString();


const INITIAL_STATE: AgreementListState = {
  agreements: {
    PLACEHOLDER_AGREEMENT_ID: {
      creationDate: 1493690737487,
      position: "buyer",
      price: 1234,
      buyer: "123.12.23.21",
      seller: "1231.123.12.1231",
      buyerPaid: true,
      buyerPaidDate: 1493690737488,
      sellerPaid: true,
      sellerPaidDate: 1493690737497,
      transactionComplete: false,
      transactionCompleteDate: 0,
      error: "",
      canceled: false,
      canceledDate: 1493690737506,
      requestPending: false,
    },
  },
};

export default function agreementListReducer(state: AgreementListState = INITIAL_STATE, action: Action): AgreementListState {
  // set agreementId, and check if payload passes an object with an error
  // or passes just the agreement int. This could be a very long
  let agreementId: string = typeof action.payload === 'object' ? action.payload[0].toString() : action.payload.toString();

  const transaction: AgreementType = state[agreementId];

  switch (action.type) {
    case 'REQUEST_PENDING':
      return {
        ...state,
        [agreementId]: {
          ...transaction,
          requestPending: true,
        }
      }
    // send button
    case 'BUYER_SENT':
      return {
        ...state,
        [agreementId]: {
          ...transaction,
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
          ...transaction,
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
          ...transaction,
          error: "Sending your ether failed.",
          requestPending: false,
        },
      };
    //confirmButton
    case 'CONFIRMED':
      return {
        ...state,
        [agreementId]: {
          ...transaction,
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
          ...transaction,
          error: "Confirmation failed. Are you connected to the internet?",
          requestPending: false,
        },
      };
    // cancel button
    case 'TRANSACTION_CANCELED':
      return {
        ...state,
        [agreementId]: {
          ...transaction,
          canceled: true,
          canceledDate: Date.now(),
          error: "",
          requestPending: false,
        },
      };
    case 'TRANSACTION_CANCEL_FAILED':
      return {
        ...state,
        [agreementId]: {
          ...transaction,
          error: "Cancellation failed",
          requestPending: false,
        }
      }
    default:
      (action: empty);
      return state;
  }
}
