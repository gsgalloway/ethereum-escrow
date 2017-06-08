// @flow
import React from 'react';
import type {AgreementType} from '../types';

type Props = {
    agreementId: string,
    sendMoney: (agreementId: string, position: "buyer" | "seller") => void,
    confirmAgreement: (agreementId: string) => void,
    cancelAgreement: (agreementId: string) => void,
  };

const Agreement = (props: Props & AgreementType) => {
  return (
      <ul>
        <li>agreementId: {props.agreementId}</li>
        <li>creationDate: {props.creationDate}</li>
        <li>position: {props.position}</li>
        <li>price: {props.price}</li>
        <li>buyer address: {props.buyer}</li>
        <li>seller address:{props.seller}</li>
        <li>buyerPaid: {props.buyerPaid}</li>
        <li>buyerPaidDate: {props.buyerPaidDate}</li>
        <li>sellerPaid: {props.sellerPaid}</li>
        <li>sellerPaidDate: {props.sellerPaidDate}</li>
        <li>agreementComplete: {props.agreementComplete}</li>
        <li>agreementCompleteDate: {props.agreementCompleteDate}</li>
        <li>error: {props.error}</li>
        <li>canceled: {props.canceled}</li>
        <li>canceledDate: {props.canceledDate}</li>
        <li>requestPending: {props.requestPending}</li>
      </ul>
  );
}

export default Agreement;
