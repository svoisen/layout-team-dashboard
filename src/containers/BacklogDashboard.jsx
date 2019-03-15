import React from 'react';

import { observer } from 'mobx-react';
import BugList from '../components/BugList';

const BacklogDashboard = observer(({ store }) => {
  return (
    <div className="dashboard backlogDashboard">
      <h2>Backlog</h2>
      <BugList bugs={ store.bugs } />
    </div>
  )
});

export default BacklogDashboard;