import './BacklogDashboard.css'
import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL } from '../bugzilla';
import { extractQuarter, extractTarget } from '../util/WhiteboardParsing';
import { createFilterActions } from '../actions/FilterActions';
import QuarterSelectionFilter from '../components/QuarterSelectionFilter';
import ComponentSelectionFilter from '../components/ComponentSelectionFilter';
import AssigneeSelectionFilter from '../components/AssigneeSelectionFilter';
import TargetSelectionFilter from '../components/TargetSelectionFilter';
import FilterControls from '../components/FilterControls';

const config = require('../config.json');

const BacklogDashboard = observer(({ store }) => {
  const filters = store.filters;
  const { applyFilters, updateFilter, clearFilters, setFiltersOpen } = createFilterActions(store);
  return (
    <div className="dashboard backlogDashboard">
      <h2>Backlog</h2>
      <details className="dashboardFilters" open={ store.filters.open } onToggle={ event => setFiltersOpen(event.target.open) }>
        <summary className="title">Filters</summary>
        <div className="contents">
          <ComponentSelectionFilter
            availableComponents={ config.layoutComponents.sort() }
            selectedComponents={ filters.components }
            onChange={ selected => updateFilter('components', selected) } />
          <AssigneeSelectionFilter
            availableAssignees={ config.team.sort() }
            selectedAssignees={ filters.assignees }
            onChange={ selected => updateFilter('assignees', selected) } />
          <QuarterSelectionFilter
            selectedQuarters={ filters.quarters }
            availableQuarters={ config.quarters.sort().reverse() }
            onChange={ selected => updateFilter('quarters', selected) } />
          <TargetSelectionFilter
            availableTargets={ config.targets.sort().reverse() }
            selectedTargets={ filters.targets }
            onChange={ selected => updateFilter('targets', selected) } />
          <FilterControls
            applyDisabled={ !store.filters.dirty }
            onApplyClick={ applyFilters }
            onClearClick={ clearFilters } />
        </div>
      </details>
      <BugList
        bugs={ store.bugs }
        columns={ [
          { title: 'ID', property: FIELD_ID, className: 'id' },
          { title: 'Summary', property: FIELD_SUMMARY, className: 'summary' },
          { title: 'Component', property: FIELD_COMPONENT, className: 'component' },
          { title: 'Assignee', property: bug => bug[FIELD_ASSIGNEE_DETAIL]['nick'], className: 'nick' },
          { title: 'Quarter', property: bug => extractQuarter(bug[FIELD_WHITEBOARD]), className: 'quarter' },
          { title: 'Target Release', property: bug => extractTarget(bug[FIELD_WHITEBOARD]), className: 'target' }
        ] } />
    </div>
  )
});

export default BacklogDashboard;