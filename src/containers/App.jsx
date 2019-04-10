import './App.css';
import React from 'react';
import Navigation from './Navigation';
import Header from '../components/Header';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import BacklogDashboard from './BacklogDashboard';
import { ROUTE_BACKLOG, ROUTE_FISSION, ROUTE_WEBCOMPAT, ROUTE_PERFORMANCE } from '../Routes';
import FissionDashboard from './FissionDashboard';
import WebcompatDashboard from './WebcompatDashboard';
import PerformanceDashboard from './PerformanceDashboard';

const App = ({ store }) => {
  const { router } = store;

  return (
    <div id="app" className="app">
      <Header />
      <Navigation router={ router } />
      <main className="content">
        <Switch>
          <Route path={ `/${ROUTE_BACKLOG}` } component={ () => <BacklogDashboard store={ store } /> } />
          <Route path={ `/${ROUTE_FISSION}` } component={ () => <FissionDashboard store={ store } /> } />
          <Route path={ `/${ROUTE_WEBCOMPAT}` } component={ () => <WebcompatDashboard store={ store } /> } />
          <Route path={ `/${ ROUTE_PERFORMANCE }` } component={ () => <PerformanceDashboard store={ store } /> } />
        </Switch>
      </main>
    </div>
  );
};

export default App;