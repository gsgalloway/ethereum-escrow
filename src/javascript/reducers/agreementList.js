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
  | TransactionCanceledAction
  | TransactionCancelFailedAction;

const INITIAL_STATE: AgreementListType = {
  agreements: {
    "asdfasdfas": {
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
export default function agreementListReducer(state: AgreementListType = INITIAL_STATE, action: Action): AgreementListType {
  const transaction: AgreementType = state[action.payload];
  switch (action.type) {
    // TODO: figure out if putting "error:""" is
    // actually the way to do it
    case 'REQUEST_PENDING':
      return {
        ...state,
        [transaction]: {
          ...transaction,
          requestPending: true,
        }
      }
    // send button
    case 'BUYER_SENT':
      return {
        ...state,
        [transaction]: {
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
        [transaction]: {
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
        [transaction]: {
          ...transaction,
          error: "Sending your ether failed.",
          requestPending: false,
        },
      };
    //confirmButton
    case 'CONFIRMED':
      return {
        ...state,
        [transaction]: {
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
        [transaction]: {
          ...transaction,
          error: "Confirmation failed. Are you connected to the internet?",
          requestPending: false,
        },
      };
    // cancel button
    case 'TRANSACTION_CANCELED':
      return {
        ...state,
        [transaction]: {
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
        [transaction]: {
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
