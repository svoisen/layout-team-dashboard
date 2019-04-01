import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore } from './stores/Store';
import { syncHistoryWithStore } from 'mobx-react-router';
import { autorun } from '../node_modules/mobx/lib/mobx';
import { ROUTE_BACKLOG } from './Routes';
import { createFetchActions } from './actions/FetchActions';
import { createFilterActions } from './actions/FilterActions';

const browserHistory = createBrowserHistory();
const store = createStore();
const history = syncHistoryWithStore(browserHistory, store.router);
const { fetchBacklog } = createFetchActions(store);
const { updateFiltersFromSearchParams } = createFilterActions(store);

const routeActionMap = {};
routeActionMap[ROUTE_BACKLOG] = fetchBacklog;

function initialize() {
  ReactDOM.render(
    <Router history={ history }>
      <App store={ store } />
    </Router>,
    document.getElementById('container')
  );
}

autorun(() => {
  const location = store.router.location;
  const unprefixedHash = location.hash.length > 0 ? location.hash.substring(1) : 'backlog';
  const action = routeActionMap[unprefixedHash];
  if (action && typeof action === 'function') {
    action();
  }
});

autorun(() => {
  const searchParams = new URLSearchParams(store.router.location.search);
  updateFiltersFromSearchParams(searchParams);
});

initialize();