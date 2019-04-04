import React from 'react';
import Multiselect from './Multiselect';

function AssigneeSelectionFilter(props) {
  const { availableAssignees, selectedAssignees, onChange } = props;
  const allAssignees = ['nobody'].concat(availableAssignees.sort());

  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterAssignee">Assignee</label>
      <Multiselect id="filterAssignee" onChange={ onChange } selectedValues={ selectedAssignees } availableValues={ allAssignees } />
    </div>
  );
}

export default AssigneeSelectionFilter;