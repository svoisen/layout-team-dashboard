import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import { createStore } from './stores/Store';
import { syncHistoryWithStore } from 'mobx-react-router';
import { autorun, reaction } from '../node_modules/mobx/lib/mobx';
import { ROUTE_BACKLOG, ROUTE_FISSION } from './Routes';
import { createFetchActions } from './actions/FetchActions';
import { createFilterActions } from './actions/FilterActions';

const hashHistory = createHashHistory();
const store = createStore();
const history = syncHistoryWithStore(hashHistory, store.router);
const { fetchBacklog, fetchFissionBacklog } = createFetchActions(store);
const { updateFiltersFromSearchParams } = createFilterActions(store);

const routeActionMap = {};
routeActionMap[ROUTE_BACKLOG] = fetchBacklog;
routeActionMap[ROUTE_FISSION] = fetchFissionBacklog;

function initialize() {
  ReactDOM.render(
    <Router history={ history }>
      <App store={ store } />
    </Router>,
    document.getElementById('container'),
    updateFromLocationChange
  );
}

function updateFromLocationChange() {
  const location = store.router.location;
  const unprefixedPath = location.pathname.substring(1);
  const action = routeActionMap[unprefixedPath];
  updateFiltersFromSearchParams(new URLSearchParams(location.search));

  if (action && typeof action === 'function') {
    action();
  }
}

reaction(() => store.router.location, updateFromLocationChange);
initialize();