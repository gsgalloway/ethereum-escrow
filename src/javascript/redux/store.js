import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';


const loggerMiddleware = createLogger();

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    ),
    window.devToolsExtension && window.devToolsExtension()
  )
);
