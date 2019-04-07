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
            availableQuarters={ config.quarters.sort() }
            onChange={ selected => updateFilter('quarters', selected) } />
          <TargetSelectionFilter
            availableTargets={ config.targets.sort() }
            selectedTargets={ filters.targets }
            onChange={ selected => updateFilter('targets', selected) } />
          <div className="controls">
            <button disabled={ !store.filters.dirty } onClick={ applyFilters }>Apply</button>
            <button className="clear" onClick={ clearFilters }>Clear All</button>
          </div>
        </div>
      </details>
      <BugList
        bugs={ store.bugs }
        columns={ [
          { title: 'ID', property: FIELD_ID },
          { title: 'Summary', property: FIELD_SUMMARY },
          { title: 'Component', property: FIELD_COMPONENT },
          { title: 'Assignee', property: bug => bug[FIELD_ASSIGNEE_DETAIL]['nick'] },
          { title: 'Quarter', property: bug => extractQuarter(bug[FIELD_WHITEBOARD]) },
          { title: 'Target Release', property: bug => extractTarget(bug[FIELD_WHITEBOARD]) }
        ] } />
    </div>
  )
});

export default BacklogDashboard;