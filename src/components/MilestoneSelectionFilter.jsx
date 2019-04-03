import React from 'react';

function MilestoneSelectionFilter(props) {
  const { selectedMilestones, availableMilestones } = props;

  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterMilestone">Milestone</label>
      <select multiple defaultValue={ selectedMilestones } id="filterMilestone">
        { ['---'].concat(availableMilestones).map(milestone => <option key={ `milestone_${milestone}` } value={ milestone }>{ milestone }</option>) }
      </select>
    </div>
  );
}

export default MilestoneSelectionFilter;