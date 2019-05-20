import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_ASSIGNEE_DETAIL, FIELD_FISSION_MILESTONE } from '../bugzilla';
import AssigneeSelectionFilter from '../components/AssigneeSelectionFilter';
import MilestoneSelectionFilter from '../components/MilestoneSelectionFilter';
import FilterControls from '../components/FilterControls';
import { createFilterActions } from '../actions/FilterActions';
import SummaryView from '../components/SummaryView';
import CollapsibleView from '../components/CollapsibleView';
import CompletionFilter from '../components/CompletionFilter';
import { COMPLETION_ANY, COMPLETION_COMPLETE, COMPLETION_INCOMPLETE } from '../stores/Store';

const config = require('../config.json');

const FissionDashboard = observer(({ store }) => {
  const filters = store.filters;
  const { applyFilters, updateFilter, clearFilters, setFiltersOpen } = createFilterActions(store);
  return (
    <div className="dashboard fissionDashboard">
      <h2>Fission Dashboard</h2>
      <CollapsibleView className="dashboardFilters" title="Filters" open={ store.ui.filtersOpen } onToggle={ event => setFiltersOpen(event.target.open) }>
        <AssigneeSelectionFilter
          availableAssignees={ config.team }
          selectedAssignees={ filters.assignees }
          onChange={ selected => updateFilter('assignees', selected) } />
        <MilestoneSelectionFilter
          availableMilestones={ config.milestones }
          selectedMilestones={ filters.milestones }
          onChange={ selected => updateFilter('milestones', selected) } />
        <CompletionFilter
          anyValue={ COMPLETION_ANY }
          completeValue={ COMPLETION_COMPLETE }
          incompleteValue={ COMPLETION_INCOMPLETE }
          selectedValue={ filters.completionStatus } 
          onChange={ selected => updateFilter('completionStatus', selected) } />
        <FilterControls
          applyDisabled={ !store.filters.dirty }
          onApplyClick={ applyFilters }
          onClearClick={ clearFilters } />
      </CollapsibleView>
      <SummaryView bugs={ store.bugs } open={ store.ui.summaryOpen } />
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