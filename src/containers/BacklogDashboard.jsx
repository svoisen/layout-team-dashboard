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
import CollapsibleView from '../components/CollapsibleView';
import CompletionFilter from '../components/CompletionFilter';
import { COMPLETION_ANY, COMPLETION_COMPLETE, COMPLETION_INCOMPLETE } from '../stores/Store';
import { createSortActions } from '../actions/SortActions';

const config = require('../config.json');

const BacklogDashboard = observer(({ store }) => {
  const filters = store.filters;
  const { applyFilters, updateFilter, clearFilters, setFiltersOpen } = createFilterActions(store);
  const { setSortField  } = createSortActions(store);

  return (
    <div className="dashboard backlogDashboard">
      <h2>Backlog Dashboard</h2>
      <CollapsibleView className="dashboardFilters" title="Filters" open={ store.ui.filtersOpen } onToggle={ event => setFiltersOpen(event.target.open) }>
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
      <BugList
        bugs={ store.bugs }
        status={ store.status.get() }
        onHeaderClick={ (field, valueFn) => setSortField(field, valueFn) }
        columns={ [
          { title: 'ID', field: FIELD_ID, value: bug => bug[FIELD_ID], className: 'id' },
          { title: 'Summary', field: FIELD_SUMMARY, value: bug => bug[FIELD_SUMMARY], className: 'summary' },
          { title: 'Component', field: FIELD_COMPONENT, value: bug => bug[FIELD_COMPONENT], className: 'component' },
          { title: 'Assignee', field: 'assignee', value: bug => bug[FIELD_ASSIGNEE_DETAIL]['nick'], className: 'nick' },
          { title: 'Quarter', field: 'quarter', value: bug => extractQuarter(bug[FIELD_WHITEBOARD]), className: 'quarter' },
          { title: 'Target Release', field: 'target', property: bug => extractTarget(bug[FIELD_WHITEBOARD]), className: 'target' }
        ] } />
    </div>
  )
});

export default BacklogDashboard;