// @flow
import TestFailed from '../TestFailed';

// Injected by Truffle framework
declare var artifacts: Artifacts;

let trustlessEscrowContract: Contract<TrustlessEscrowInstance> = artifacts.require("TrustlessEscrow");

contract('TrustlessEscrow', function(accounts: string[]): void {
    let buyer = accounts[0];
    let seller = accounts[1];
    let value = 100;
    let sellersCost = value;
    let buyersCost = value * 2;
    describe('#createAgreement', function() {
        it('should work with valid parameters', function() {
            let instance: TrustlessEscrowInstance;
            return trustlessEscrowContract.deployed()
                .then((_instance: TrustlessEscrowInstance) => {
                    instance = _instance;
                    return _instance.createAgreement(buyer, seller, value);
                })
                .then((result: TransactionResult) => {
                    assert.isNotNull(result.tx);
                    return instance.numAgreements.call();
                })
                .then((numAgreements: BigNumber) => {
                    assert.equal(numAgreements.toNumber(), 1);
                    return instance.agreements.call(0);
                })
                .then((agreementStruct: any[]) => {
                    let observedBuyer: string = agreementStruct[0];
                    let observedSeller: string = agreementStruct[1];
                    let observedValue: BigNumber = agreementStruct[2];
                    let buyerConfirmedAgreement: bool = agreementStruct[3];
                    let sellerConfirmedAgreement: bool = agreementStruct[4];
                    assert.equal(observedBuyer, buyer);
                    assert.equal(observedSeller, seller);
                    assert.equal(observedValue.toNumber(), value);
                    assert.isFalse(buyerConfirmedAgreement);
                    assert.isFalse(sellerConfirmedAgreement);
                    return instance.numAgreementsPerParticipant.call(buyer);
                })
                .then((numAgreementsForBuyer: BigNumber) => {
                    assert.equal(numAgreementsForBuyer.toNumber(), 1);
                    return instance.numAgreementsPerParticipant.call(seller);
                })
                .then((numAgreementsForSeller: BigNumber) => {
                    assert.equal(numAgreementsForSeller.toNumber(), 1);
                    return instance.agreementIdsByParticipant.call(buyer, 0);
                })
                .then((buyersFirstAgreementId: BigNumber) => {
                    assert.equal(buyersFirstAgreementId.toNumber(), 0);
                    return instance.agreementIdsByParticipant.call(seller, 0);
                })
                .then((sellersFirstAgreementId: BigNumber) => {
                    assert.equal(sellersFirstAgreementId.toNumber(), 0);
                });
        });
    });

    describe('#buyerConfirmsAgreement', function() {
        describe('when called by the buyer with the right value', function() {
            let instance: TrustlessEscrowInstance;

            before('setup agreement', function() {
                return trustlessEscrowContract.new().then((_instance: TrustlessEscrowInstance) => {
                    instance = _instance;
                    return _instance.createAgreement(buyer, seller, value);
                });
            });

            it('should succeed', function() {
                let agreementId = 0;
                return instance.buyerConfirmsAgreement(agreementId, {from: buyer, value: buyersCost});
            });

            it('should have set only buyerConfirmedAgreement to true', function() {
                return instance.agreements.call(0).then((agreementStruct: any[]) => {
                    let buyerConfirmedAgreement: bool = agreementStruct[3];
                    let sellerConfirmedAgreement: bool = agreementStruct[4];
                    assert.isTrue(buyerConfirmedAgreement);
                    assert.isFalse(sellerConfirmedAgreement);
                });
            });
        });

        describe('when called by the buyer with the wrong value', function() {
            let instance: TrustlessEscrowInstance;

            before('setup agreement', function() {
                return trustlessEscrowContract.new().then((_instance: TrustlessEscrowInstance) => {
                    instance = _instance;
                    return _instance.createAgreement(buyer, seller, value);
                });
            });

            it('should fail', function() {
                let agreementId = 0;
                return instance.buyerConfirmsAgreement(agreementId, {from: buyer, value: sellersCost}).then(() => {
                    // If we get here, it means the above transaction worked. We're expecting it to have failed,
                    // so this test has failed.
                    throw new TestFailed("Expected buyerConfirmsAgreement() to fail when called as seller");
                })
                .catch((e: Error) => {
                    if (e instanceof TestFailed) throw e;
                });
            });

            it('should not have affected the agreement state', function() {
                return instance.agreements.call(0).then((agreementStruct: any[]) => {
                    let buyerConfirmedAgreement: bool = agreementStruct[3];
                    let sellerConfirmedAgreement: bool = agreementStruct[4];
                    assert.isFalse(buyerConfirmedAgreement, "buyerConfirmedAgreement should be false");
                    assert.isFalse(sellerConfirmedAgreement, "sellerConfirmedAgreement should be false");
                });
            });
        });

        describe('when called by the seller for the buyer\'s amount', function() {
            let instance: TrustlessEscrowInstance;

            before('setup agreement', function() {
                return trustlessEscrowContract.new().then((_instance: TrustlessEscrowInstance) => {
                    instance = _instance;
                    return _instance.createAgreement(buyer, seller, value);
                });
            });

            it('should fail', function() {
                let agreementId = 0;
                return instance.buyerConfirmsAgreement(agreementId, {from: seller, value: buyersCost})
                    .then(() => {
                        // If we get here, it means the above transaction worked. We're expecting it to have failed,
                        // so this test has failed.
                        throw new TestFailed("Expected buyerConfirmsAgreement() to fail when called as seller");
                    })
                    .catch((e: Error) => {
                        if (e instanceof TestFailed) throw e;
                    });
            });

            it('should not have affected the agreement state', function() {
                return instance.agreements.call(0).then((agreementStruct: any[]) => {
                    let buyerConfirmedAgreement: bool = agreementStruct[3];
                    let sellerConfirmedAgreement: bool = agreementStruct[4];
                    assert.isFalse(buyerConfirmedAgreement, "buyerConfirmedAgreement should be false");
                    assert.isFalse(sellerConfirmedAgreement, "sellerConfirmedAgreement should be false");
                });
            });
        });
    });
});
