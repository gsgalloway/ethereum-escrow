// @flow

// Injected by Truffle framework
declare var artifacts: Artifacts;

let trustlessEscrowContract: Contract<TrustlessEscrowInstance> = artifacts.require("TrustlessEscrow");

contract('TrustlessEscrow', function(accounts: string[]): void {
    let buyer = accounts[0];
    let seller = accounts[1];
    describe('#createAgreement', function() {
        it('should work with valid parameters', function() {
            let instance: TrustlessEscrowInstance;
            let value = 100;
            return trustlessEscrowContract.deployed()
                .then((_instance: TrustlessEscrowInstance) => {
                    instance = _instance;
                    return _instance.createAgreement(buyer, seller, value)
                })
                .then((result: TransactionResult) => {
                    assert.isNotNull(result.tx);
                    return instance.numAgreements.call()
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
});
