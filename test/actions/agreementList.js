// @flow
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {sendMoney,confirmAgreement, cancelAgreement, sortAgreements} from '../../src/javascript/actions/agreementList';

declare var artifacts : Artifacts;

let trustlessEscrowContract : Contract < TrustlessEscrowInstance > = artifacts.require("TrustlessEscrow");

const middlewares : Array < mixed > = [thunk];
const mockStore = configureMockStore[middlewares];

// goals in a test, test: 
// When the async operation begins
// When the async operation finishes 
// Whether the async operation succeeded or failed

contract('agreementList actions', (accounts : string[]) : void => {
  // Create a testable instance
  let buyer = accounts[0];
  let seller = accounts[1];
  let value = 100;
  let sellerCost = value;
  let buyerCost = value * 2;
  let instance : TrustlessEscrowInstance;
  let agreementId: string;
 
  before('setup agreement', function () {
    return trustlessEscrowContract.new()
      .then((_instance : TrustlessEscrowInstance) => {
          instance = _instance; // instance points to _instance??
          return _instance.createAgreement(buyer, seller, value);
        })
      .then(() => {
        // ask instance to return numAgreements
        return instance.numAgreements.call();
      })
      .then((numAgreements: BigNumber) => {
        // convert the BigNumber to number to string
        agreementId = numAgreements.toNumber().toString();
      })
    });

  
  describe('sendMoney', () => {
    const expectedActions = [
        {
          type: 'REQUEST_PENDING',
          payload: agreementId
        }, {
          type: 'BUYER_SENT',
          payload: {
            agreementId: agreementId,
            timestamp: timestamp
          }
        }, {
          type: 'SELLER_SENT',
          payload: {
            agreementId: agreementId,
            timestamp: timestamp
          }
        }, {
          type: 'SEND_FAILED',
          payload: {
            agreementId: agreementId,
            error: error
          }
        }
      ];

    describe('sendMoney to returns correct actions', () => {

      it('waits for the request', () => {
        const store = mockStore({});
        return store.dispatch(sendMoney(agreementId, "buyer"))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).to.deep.equal(expectedActions[0]);
        });
      });

      it('succeeds on valid buyer', () => {
        const store = mockStore({});
        return store.dispatch(sendMoney(agreementId, "buyer"))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).to.deep.equal(expectedActions[1]);
        });
      });

      it('succeeds on valid seller', () => {
        const store = mockStore({});
        return store.dispatch(sendMoney(agreementId, "seller"))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).to.deep.equal(expectedActions[2]);
        });
      });
      
      it('fails on incorrect agreementId', () => {
        const badAgreementId = "agreementIdsAreSupposedToBeNumbersConvertedToStrings";
        const store = mockStore({});
        return store.dispatch(sendMoney(badAgreementId, "buyer"))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).to.deep.equal(expectedActions[4]);
        });
      });
    });
  });

  describe.skip("confirmAgreement");

  describe.skip("cancelAgreement");
});
