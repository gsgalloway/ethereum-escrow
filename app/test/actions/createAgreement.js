// @flow
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createAgreement, Action as CreateAgreementAction } from '../../src/javascript/actions/createAgreement.js';
import { setTrustlessEscrowContract } from "../../src/javascript/web3";

declare var artifacts: Artifacts;

let trustlessEscrowContract: Contract<TrustlessEscrowInstance> = artifacts.require("TrustlessEscrow");

const mockStore = configureStore([thunkMiddleware]);

contract('createAgreement', function(accounts: string[]): void {
    const buyer = accounts[0];
    const seller = accounts[1];

    beforeEach('wire up truffle test artifacts', function() {
        setTrustlessEscrowContract(trustlessEscrowContract);
    });

    describe('when called', function() {
        it('should work', async function() {
            const store = mockStore();
            await trustlessEscrowContract.deployed();
            await store.dispatch(createAgreement(buyer, seller, 10));
            const observedActions: CreateAgreementAction[] = store.getActions();
            assert.lengthOf(observedActions, 2);
            assert.equal(observedActions[0].type, 'CREATE_AGREEMENT_PENDING');
            assert.equal(observedActions[1].type, 'CREATE_AGREEMENT_FULFILLED');
        });
    });

    describe.skip("createAgreementPending", function(){});

    describe.skip("createAgreementFulfilled", function(){});

    describe.skip("createAgreementFailed", function(){});

    describe.skip("createAgreement", function(){});
});
