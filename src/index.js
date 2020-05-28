import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { productOverview } from './redux/productOverview';
import { admin } from './redux/admin';
import { toast } from './redux/toast';
import { session } from './redux/session';

import './index.scss';
import './normalize.css';

const logger = createLogger()

const rootReducers = combineReducers({productOverview, admin, toast, session})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
