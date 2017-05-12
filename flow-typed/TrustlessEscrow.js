declare class TrustlessEscrowInstance extends ContractInstance {
  createAgreement: {
    (buyerAddress: string, sellerAddress: string, value: number): Promise<TransactionResult>,
    // call: ()
  },
  numAgreements: {
    call(): Promise<BigNumber>,
  };
  agreements: {
    call(agreementId: number): Promise<any[]>,
  };
  agreementIdsByParticipant: {
    call(participantAddress: string, index: number): Promise<BigNumber>,
  };
  numAgreementsPerParticipant: {
    call(participantAddress: string): Promise<BigNumber>,
  };
  agreementIsLocked: {
    call(agreementId: number): Promise<bool>;
  };
  buyerConfirmsAgreement(agreementId: number): Promise<TransactionResult>;
  sellerConfirmsAgreement(agreementId: number): Promise<TransactionResult>;
  destroy(): Promise<TransactionResult>;
  createAgreement(buyerAddress: string, sellerAddress: string, value: number): Promise<TransactionResult>;
  confirmReceived(agreementId: number): Promise<TransactionResult>;
};
