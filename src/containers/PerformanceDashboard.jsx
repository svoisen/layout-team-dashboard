import React from 'react';
import { observer } from 'mobx-react';

const PerformanceDashboard = observer(({ store }) => {
  return (
    <div className="dashboard performanceDashboard">
      <h2>Performance Dashboard</h2>
    </div>
  )
});

export default PerformanceDashboard;