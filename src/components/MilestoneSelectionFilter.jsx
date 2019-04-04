import React from 'react';
import Multiselect from './Multiselect';

function MilestoneSelectionFilter(props) {
  const { selectedMilestones, availableMilestones, onChange } = props;

  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterMilestone">Milestone</label>
      <Multiselect id="filterMilestone" availableValues={ ['---'].concat(availableMilestones) } selectedValues={ selectedMilestones } onChange={ onChange } />
    </div>
  );
}

export default MilestoneSelectionFilter;