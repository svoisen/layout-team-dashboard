import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_ASSIGNEE_DETAIL, FIELD_FISSION_MILESTONE } from '../bugzilla';

const FissionDashboard = observer(({ store }) => {
  return (
    <div className="dashboard fissionDashboard">
      <h2>Fission</h2>
      <BugList
        bugs={ store.bugs }
        columns={ [
          { title: 'ID', property: FIELD_ID },
          { title: 'Summary', property: FIELD_SUMMARY },
          { title: 'Component', property: FIELD_COMPONENT },
          { title: 'Assignee', property: bug => bug[FIELD_ASSIGNEE_DETAIL]['nick'] },
          { title: 'Milestone', property: FIELD_FISSION_MILESTONE }
        ] } />
    </div>
  );
});

export default FissionDashboard;