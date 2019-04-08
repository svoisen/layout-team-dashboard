import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_ASSIGNEE_DETAIL, FIELD_FISSION_MILESTONE } from '../bugzilla';
import AssigneeSelectionFilter from '../components/AssigneeSelectionFilter';
import MilestoneSelectionFilter from '../components/MilestoneSelectionFilter';

const config = require('../config.json');

const FissionDashboard = observer(({ store }) => {
  return (
    <div className="dashboard fissionDashboard">
      <h2>Fission</h2>
      <details className="dashboardFilters">
        <summary className="title">Filters</summary>
        <div className="contents">
          <AssigneeSelectionFilter availableAssignees={ config.team } />
          <MilestoneSelectionFilter availableMilestones={ config.milestones } />
        </div>
      </details>
      <BugList
        bugs={ store.bugs }
        columns={ [
          { title: 'ID', property: FIELD_ID, className: 'id' },
          { title: 'Summary', property: FIELD_SUMMARY, className: 'summary' },
          { title: 'Component', property: FIELD_COMPONENT, className: 'component' },
          { title: 'Assignee', property: bug => bug[FIELD_ASSIGNEE_DETAIL]['nick'] },
          { title: 'Milestone', property: FIELD_FISSION_MILESTONE }
        ] } />
    </div>
  );
});

export default FissionDashboard;