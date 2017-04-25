// import App from './components/App/App.jsx';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import { store } from './redux/store';
import getRoutes from './routes.jsx';
import '../stylesheets/app.css';

import { IndexRoute, Route } from 'react-router';


var routes = getRoutes();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
     {routes}
    </Router>
  </Provider>,
  document.getElementById('content')
);
