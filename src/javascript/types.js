// state object for agreementList reducer
export type AgreementListState = {
  agreements:{
    [transactionHash:string]:{
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
    },
  },
  allTransactions: Array<string>,
};
// Agreement List
export type AgreementsType = {
    [transactionHash:string]:{
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
    },
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
