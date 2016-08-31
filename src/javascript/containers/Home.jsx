import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'


export default class Home extends Component {
  render() {
    return (
      <Link to="/createAgreement">Create New Agreement of Sale</Link>
    );
  }
};
