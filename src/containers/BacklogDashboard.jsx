import './BacklogDashboard.css'
import React from 'react';
import { observer } from 'mobx-react';
import BugList from '../components/BugList';
import { FIELD_ID, FIELD_SUMMARY, FIELD_COMPONENT, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL } from '../bugzilla';
import { extractQuarter, prettyPrintQuarter, extractTarget } from '../util/WhiteboardParsing';
import { createFilterActions } from '../actions/FilterActions';

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
          <div className="group group__vertical">
            <label htmlFor="filterQuarter">Quarter</label>
            <select multiple defaultValue={ filters.quarters } id="filterQuarter">
              { config.quarters.map(quarter => <option key={ quarter } value={ quarter }>{ prettyPrintQuarter(quarter) }</option>) }
            </select>
          </div>
          <div className="group group__vertical">
            <label htmlFor="filterComponent">Component</label>
            <select multiple id="filterComponent">
              { config.layoutComponents.map((component, idx) => <option key={ `component_${idx}` } value={ component }>{ component }</option>)}
            </select>
          </div>
          <div className="group group__vertical">
            <label htmlFor="filterAssignee">Assignee</label>
            <select multiple defaultValue={ filters.assignees } id="filterAssignee">
              { config.team.sort().map((nick, idx) => <option key={ `assignee_${idx}` } value={ nick }>{ nick }</option>)}
            </select>
          </div>
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