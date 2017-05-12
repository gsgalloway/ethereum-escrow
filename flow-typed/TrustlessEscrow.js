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
  buyerConfirmsAgreement(agreementId: number, txOptions: TxParams): Promise<TransactionResult>;
  sellerConfirmsAgreement(agreementId: number, txOptions: TxParams): Promise<TransactionResult>;
  destroy(txOptions?: TxParams): Promise<TransactionResult>;
  createAgreement(buyerAddress: string, sellerAddress: string, value: number, txOptions?: TxParams): Promise<TransactionResult>;
  confirmReceived(agreementId: number, txOptions?: TxParams): Promise<TransactionResult>;
};
