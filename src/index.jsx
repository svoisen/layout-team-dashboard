import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore } from './stores/Store';
import { syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const store = createStore();
const history = syncHistoryWithStore(browserHistory, store.router);

function initialize() {
  ReactDOM.render(
    <Router history={ history }>
      <App store={ store } />
    </Router>,
    document.getElementById('container')
  );
}

initialize();