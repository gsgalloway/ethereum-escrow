// @flow
import type {
  PendingAction,
  FulfilledAction,
  FailedAction
} from '../actions/createAgreement';

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
      (action: empty);
      return state;
  }
};
