import {
    CREATE_AGREEMENT_PENDING,
    CREATE_AGREEMENT_FULFILLED,
    CREATE_AGREEMENT_FAILED
  } from '../constants';


const INITIAL_STATE = {
  agreementPending: false,
  error: '',
}

export default function createAgreementReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_AGREEMENT_PENDING:
      return {
        ...state,
        agreementPending: true,
        error: ''
      };
    case CREATE_AGREEMENT_FULFILLED:
      return {
        ...state,
        agreementPending: false,
        error: ''
      };
    case CREATE_AGREEMENT_FAILED:
      return {
        ...state,
        agreementPending: false,
        error: action.payload.error.message
      };
    default:
      return state;
  }
};
