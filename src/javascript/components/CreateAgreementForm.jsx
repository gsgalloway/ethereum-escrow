import React, { Component } from 'react';

export default class CreateAgreementForm extends Component {
  props: {
    onFormSubmit: void,
    agreementPending: string,
    error: string,
  }

  state: {
    buyer: string;
    seller: string;
    price: string;
  }

  constructor(props) {
    super(props);
    // going to start by giving input state to the component
    // until the value is submitted, then giving the values to the
    // global store
    this.state = {
      buyer: '',
      seller: '',
      price: '',
    }
    // flow error with binding class methods in constructor
    // can be removed if we use ES7 stage 2 arrow functions to
    // encapsulate scope
    // there are other methods, but they reduce performance
    const self: Object = this;

    self.handleChange = this.handleChange.bind(this);
    self.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e: SyntheticInputEvent & { target: HTMLInputElement}) {
    const { target } = e;
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e: SyntheticInputEvent) {
    e.preventDefault();
    const { buyer, seller, price } = this.state;
    if (!buyer || !seller || !price) {
      // TODO: Add error logic/ alert dropdown
      return alert('Form not complete');
    };
    this.props.onFormSubmit(buyer.trim(), seller.trim(), price.trim());
  }

  render() {
    return (
      <div>
        <h2>Trustless Escrow</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Buyer Address
            <input type="text" name="buyer" value={this.state.buyer} onChange={this.handleChange} />
          </label>
           <br />
          <label>
            Seller Address
            <input type="text" name="seller" value={this.state.seller} onChange={this.handleChange} />
          </label>
        <br />
          <label>
            Price
            <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Create Agreement" />
        </form>
        <p>{this.props.error}</p>
    </div>
    );
  }
};
