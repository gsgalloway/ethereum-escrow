// @flow
import React from 'react';

const CreateAgreementForm = (props: {onSubmit: Function, error: string}) => {
  const { onSubmit, error } = props;

  let buyer,
      seller,
      price;

  return (
    <div>
      <h1>Trustless Escrow</h1>

      <form onSubmit={e => {
        e.preventDefault();
        if (!buyer.value.trim() || !seller.value.trim()) {
          return;
        };

        onSubmit(buyer.value, seller.value, price.value);
      }}>

        Buyer Address <input type="text" ref={ref => buyer = ref} />
        Seller Address <input type="text" ref={ref => seller = ref} />
        Price <input type="text" ref={ref => price = ref} />
        <input type="submit" value="Create Agreement" />

        <p>{error}</p>

      </form>
    </div>
  );
}

export default CreateAgreementForm;
