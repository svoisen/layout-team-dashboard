import './App.css';
import React from 'react';
import Navigation from './Navigation';
import Header from '../components/Header';
import { observer } from 'mobx-react';

const App = observer(({ store }) => {
  const { router } = store;

  return (
    <div id="app" className="app">
      <Header />
      <Navigation router={ router } />
      <main className="content">

      </main>
    </div>
  );
});

export default App;