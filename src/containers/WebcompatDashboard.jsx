import React from 'react';
import { observer } from 'mobx-react';

const WebcompatDashboard = observer(({ store }) => {
  return (
    <div className="dashboard webcompatDashboard">
      <h2>Webcompat</h2>
    </div>
  );
});

export default WebcompatDashboard;