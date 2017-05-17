// @flow
import React from 'react';
import type {AgreementType} from '../types';

type Props = {
  sendMoney: (agreementId: string, position: "buyer" | "seller") => void,
  confirmAgreement: (agreementId: string) => void,
  cancelAgreement: (agreementId: string) => void,
  sortAgreements: (sortKey: string, sortKind: "ascending" | "descending") => void,
};

const Agreement = (props: Props & AgreementType) => {
  return (
      <p>Agreement Rendered</p>
  );
}

export default Agreement;
