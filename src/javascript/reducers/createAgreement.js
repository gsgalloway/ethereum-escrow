import {
    CREATE_CONTRACT_PENDING,
    CREATE_CONTRACT_FULFILLED,
    CREATE_CONTRACT_FAILED
  } from '../actions';


const INITIAL_STATE = {
  agreementPending: false,
  error: '',
}

export default function createAgreementReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CONTRACT_PENDING:
      return {
        ...state,
        agreementPending: true,
        error: ''
      };
    case CREATE_CONTRACT_FULFILLED:
      return {
        ...state,
        agreementPending: false,
        error: ''
      };
    case CREATE_CONTRACT_FAILED:
      return {
        ...state,
        agreementPending: false,
        error: action.error.message
      };
    default:
      return state;
  }
};
