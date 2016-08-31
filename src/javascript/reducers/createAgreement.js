import {
    CREATE_CONTRACT_PENDING,
    CREATE_CONTRACT_FULFILLED,
    CREATE_CONTRACT_FAILED
  } from '../actions';


const INITIAL_STATE = {
  pending: false,
  error: {},
}

export default function createAgreementReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CONTRACT_PENDING:
      return {
        ...state,
        pending: true,
        error: {}
      };
    case CREATE_CONTRACT_FAILED:
      console.log(action.error);
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};
