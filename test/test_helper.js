import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

// find a replacement for simulating the dom in node
// import jsdom from 'jsdom';

import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/javascript/reducers';

// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.window = global.document.defaultView;
// global.navigator = global.window.navigator;
// const $ = _$(window);

chaiJquery(chai, chai.util, $);

// function renderComponent(ComponentClass, props = {}, state = {}) {
//   const componentInstance = TestUtils.renderIntoDocument(
//     <Provider store={createStore(reducers, state)}>
//       <ComponentClass {...props}/>
//     </Provider>
//   );

//   return $(ReactDOM.findDOMNode(componentInstance));
// }

$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  ReactTestUtils.Simulate[eventName](this[0]);
};


export {renderComponent, expect};