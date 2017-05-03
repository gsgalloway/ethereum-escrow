// @flow
import React, { Component } from 'react';
import { Link } from 'react-router'


export default class Home extends Component {
  render() {
    return (
      <div>
        <p>This is the home page! Here's the routes:</p>
        <ul>
            <li><Link to="/createAgreement">Create New Agreement of Sale</Link></li>
            <li><Link to="/viewAgreement">View Existing Agreement</Link></li>
        </ul>
      </div>
    );
  }
};
