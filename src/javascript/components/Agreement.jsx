// @flow
import React from 'react';
import type {AgreementType} from '../types';

type Props = {
  sendMoney: (agreementId: string, position: "buyer" | "seller") => void,
  confirmAgreement: (agreementId: string) => void,
  cancelAgreement: (agreementId: string) => void,

};

const Agreement = (props: Props & AgreementType) => {
  return (
      <ul>
        <li>{props.creationDate}</li>
      </ul>
  );
}

export default Agreement;
