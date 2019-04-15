import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_ASSIGNEE_DETAIL, FIELD_FISSION_MILESTONE } from '../bugzilla';
import AssigneeSelectionFilter from '../components/AssigneeSelectionFilter';
import MilestoneSelectionFilter from '../components/MilestoneSelectionFilter';
import FilterControls from '../components/FilterControls';
import { createFilterActions } from '../actions/FilterActions';

const config = require('../config.json');

const FissionDashboard = observer(({ store }) => {
  const filters = store.filters;
  const { applyFilters, updateFilter, clearFilters, setFiltersOpen } = createFilterActions(store);
  return (
    <div className="dashboard fissionDashboard">
      <h2>Fission Dashboard</h2>
      <details className="dashboardFilters" open={ store.filters.open } onToggle={ event => setFiltersOpen(event.target.open) }>
        <summary className="title">Filters</summary>
        <div className="contents">
          <AssigneeSelectionFilter
            availableAssignees={ config.team }
            selectedAssignees={ filters.assignees }
            onChange={ selected => updateFilter('assignees', selected) } />
          <MilestoneSelectionFilter
            availableMilestones={ config.milestones }
            selectedMilestones={ filters.milestones }
            onChange={ selected => updateFilter('milestones', selected) } />
          <FilterControls
            applyDisabled={ !store.filters.dirty }
            onApplyClick={ applyFilters }
            onClearClick={ clearFilters } />
        </div>
      </details>
      <BugList
        bugs={ store.bugs }
        status={ store.status.get() }
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