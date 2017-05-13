// @flow

// global state
export type reduxStoreType = {
  agreementList: AgreementListState,
  createAgreement: {
    agreementPending: bool,
    error: string,
  }
}

// state object for agreementList reducer
export type AgreementListState = {
  agreements: AgreementsType,
};

// Agreement List
export type AgreementsType = {
    [agreementId: string]: AgreementType,
};

// single agreement
export type AgreementType = {
  creationDate: number,
  position: string,
  price: number,
  buyer: string,
  seller: string,
  buyerPaid: bool,
  buyerPaidDate: ?number,
  sellerPaid: bool,
  sellerPaidDate: ?number,
  transactionComplete: bool,
  transactionCompleteDate: ?number,
  error: ?string,
  canceled: bool,
  canceledDate: number,
  requestPending: bool,
};
