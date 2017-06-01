// @flow
import React from 'react';

type Props = {
  sortKey: string,
  sortKind: "descending" | "ascending",
  sortAgreements: (sortKey: string, sortKind: "ascending" | "descending") => void,
}

const AgreementListNav = (props: Props) => {

  function handleSort(key: string): void {

    if (props.sortKind === "ascending" && props.sortKey === key) {
      return props.sortAgreements(key, "descending");
    }
    return props.sortAgreements(key, 'ascending');
  }
  // TODO: agree on if these are the only sorts that we want to do
  return (
    <div>
      <button type="button" onClick={() => handleSort("creationDate")}>creationDate</button>
      <button type="button" onClick={() => handleSort("price")}>price</button>
      <button type="button" onClick={() => handleSort("agreementCompleteDate")}>agreementCompleteDate</button>
      <button type="button" onClick={() => handleSort("canceledDate")}>canceledDate</button>
      
    </div>
  );

}

export default AgreementListNav;
