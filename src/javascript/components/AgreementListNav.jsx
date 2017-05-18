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

  return (
    <div>
      <button type="button" onClick={() => handleSort("creationDate")}>creationDate</button>
    </div>
  );

}

export default AgreementListNav;
