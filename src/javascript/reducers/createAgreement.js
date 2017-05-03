// @flow
import {
    CREATE_AGREEMENT_PENDING,
    CREATE_AGREEMENT_FULFILLED,
    CREATE_AGREEMENT_FAILED
  } from '../constants';
import type {
  PendingAction,
  FulfilledAction,
  FailedAction
} from '../actions/index';
type State = {
  +agreementPending: bool,
  +error: ?string,
};

// FailedAction is never checked.... WHY?
// (called disjoint union)
type Action = PendingAction | FulfilledAction | FailedAction;

const INITIAL_STATE: State = {
  agreementPending: false,
  error: '',
}

export default function createAgreementReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'CREATE_AGREEMENT_PENDING':
      return {
        ...state,
        agreementPending: true,
        error: ''
      };
    case 'CREATE_AGREEMENT_FULFILLED':
      return {
        ...state,
        agreementPending: false,
        error: ''
      };
    case 'CREATE_AGREEMENT_FAILED':
      return {
        ...state,
        agreementPending: false,
        error: action.payload

      };
    default:
      return state;
  }
};
