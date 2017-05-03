// @flow
import React, { Component, PropTypes } from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import CreateAgreement from './containers/CreateAgreement';
import Home from './containers/Home';
import ViewAgreement from './containers/ViewAgreement';


export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="createAgreement" component={CreateAgreement}/>
      <Route path="viewAgreement" component={ViewAgreement}/>
    </Route>
  );
};
