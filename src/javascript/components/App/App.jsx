import React, { Component, PropTypes } from 'react';
import { createContract } from '../../actions/actions.js';
import { connect } from 'react-redux'

var App = ({dispatch}) => {
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
          // dispatch(addTodo(input.value))
          // input.value = ''
          var txOptions = {from: buyer.value}
          dispatch(createContract(buyer.value, seller.value, price.value, txOptions));
        }}>

          Buyer Address <input type="text" ref={ref => buyer = ref} />
          Seller Address <input type="text" ref={ref => seller = ref} />
          Price <input type="text" ref={ref => price = ref} />
          <input type="submit" value="Create Contract" />

        </form>
      </div>
    );
}

App = connect()(App);

export default App;
