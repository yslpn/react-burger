import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk, { ThunkAction } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { wsMiddleware } from './services/middleware/ws-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

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

export const wsActions = {
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

const enhancer = composeWithDevTools(applyMiddleware(
  thunk,
  wsFeedOrdersMiddleware,
  wsProfileOrdersMiddleware
));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-burger">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
