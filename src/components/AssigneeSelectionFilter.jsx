import React from 'react';

function AssigneeSelectionFilter(props) {
  const { availableAssignees, selectedAssignees } = props;
  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterAssignee">Assignee</label>
      <select multiple defaultValue={ selectedAssignees } id="filterAssignee">
        { ['nobody'].concat(availableAssignees.sort()).map(nick => <option key={ `assignee_${nick}` } value={ nick }>{ nick }</option>)}
      </select>
    </div>
  );
}

export default AssigneeSelectionFilter;