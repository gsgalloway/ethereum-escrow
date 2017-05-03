// @flow
import { combineReducers } from 'redux';
import createAgreement from './createAgreement';
import agreementList from './agreementList';

export default combineReducers({
  createAgreement,
  agreementList
});
