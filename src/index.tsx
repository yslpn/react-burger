import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { wsMiddleware } from './services/middleware/ws-middleware';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_USER_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_GET_FEED_ORDERS,
  WS_CONNECTION_GET_USER_ORDERS,
  WS_SEND_MESSAGE
} from './services/actions/ws';

import { wsUrl } from 'utils/constants';
import { wsUserUrl } from 'utils/constants';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitProfile: WS_USER_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getFeedOrders: WS_CONNECTION_GET_FEED_ORDERS,
  getProfileOrders: WS_CONNECTION_GET_USER_ORDERS,
};

const wsFeedOrdersMiddleware = wsMiddleware(wsUrl, wsActions);
const wsProfileOrdersMiddleware = wsMiddleware(wsUserUrl, wsActions, true)

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  wsFeedOrdersMiddleware,
  wsProfileOrdersMiddleware
));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
