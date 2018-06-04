// @flow

// global state
export type reduxStoreType = {
  +agreementList: AgreementListState,
  +createAgreement: {
    +agreementPending: bool,
    +error: string,
  },
};

// state object for agreementList reducer
export type AgreementListState = {
    +agreementsById: AgreementListType,
    +allAgreementIds: Array<string>,
    +sortKey: string,
    +sortKind: "descending" | "ascending",
};
// object of agreements
export type AgreementListType = {
  +[agreementId: string]: AgreementType,
}

// single agreement
export type AgreementType = {
  +creationDate: number,
  +position: string,
  +price: number,
  +buyer: string,
  +seller: string,
  +buyerPaid: bool,
  +buyerPaidDate: ?number,
  +sellerPaid: bool,
  +sellerPaidDate: ?number,
  +agreementComplete: bool,
  +agreementCompleteDate: ?number,
  +error: ?string,
  +canceled: bool,
  +canceledDate: number,
  +requestPending: bool,
};
