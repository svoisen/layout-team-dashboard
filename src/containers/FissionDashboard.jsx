import React from 'react';
import { observer } from 'mobx-react';

const FissionDashboard = observer(({ store }) => {
  return (
    <div className="dashboard fissionDashboard">
      <h2>Fission</h2>
    </div>
  );
});

export default FissionDashboard;