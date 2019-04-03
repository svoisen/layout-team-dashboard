import './BacklogDashboard.css'
import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL } from '../bugzilla';
import { extractQuarter, prettyPrintQuarter, extractTarget } from '../util/WhiteboardParsing';
import { createFilterActions } from '../actions/FilterActions';
import QuarterSelectionFilter from '../components/QuarterSelectionFilter';
import ComponentSelectionFilter from '../components/ComponentSelectionFilter';
import AssigneeSelectionFilter from '../components/AssigneeSelectionFilter';

const config = require('../config.json');

function multiSelectValues(id) {
  return Array.from(document.getElementById(id).selectedOptions).map(option => option.value);
}

const BacklogDashboard = observer(({ store }) => {
  const filters = store.filters;
  const { applyFilters } = createFilterActions(store);
  return (
    <div className="dashboard backlogDashboard">
      <h2>Backlog</h2>
      <details className="dashboardFilters">
        <summary className="title">Filters</summary>
        <div className="contents">
          <QuarterSelectionFilter selectedQuarters={ filters.quarters } availableQuarters={ config.quarters } />
          <ComponentSelectionFilter availableComponents={ config.layoutComponents.sort() } />
          <AssigneeSelectionFilter availableAssignees={ config.team.sort() } selectedAssignees={ filters.assignees } />
          <div className="group group__vertical">
            <label htmlFor="filterTarget">Target</label>
            <select multiple id="filterTarget">
              { [67, 68, 69, 70].map(target => <option key={ `target_${target}` } value={ target }>{ `Fx ${target}` }</option>) }
            </select>
          </div>
          <div className="controls">
            <button onClick={ () => applyFilters({
              quarters: multiSelectValues('filterQuarter'),
              assignees: multiSelectValues('filterAssignee')
            }) }>Apply</button>
            <button>Clear All</button>
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