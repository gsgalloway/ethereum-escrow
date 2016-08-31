import React, { Component, PropTypes } from 'react'

export default class CreateAgreementForm extends Component {
  render() {
    const { onSubmit, error } = this.props

    var buyer,
        seller,
        price;

    return (
      <div>
        <h1>Trustless Escrow</h1>

        <form onSubmit={e => {
          e.preventDefault()
          if (!buyer.value.trim() || !seller.value.trim()) {
            return
          }

          onSubmit(buyer.value, seller.value, price.value)
        }}>

          Buyer Address <input type="text" ref={ref => buyer = ref} />
          Seller Address <input type="text" ref={ref => seller = ref} />
          Price <input type="text" ref={ref => price = ref} />
          <input type="submit" value="Create Agreement" />

          {error}

        </form>
      </div>
    );
  }
}

CreateAgreementForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
