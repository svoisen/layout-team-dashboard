import React from 'react';
import Multiselect from './Multiselect';

function TargetSelectionFilter(props) {
  const { availableTargets, selectedTargets, onChange } = props;
  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterTarget">Target</label>
      <Multiselect id="filterTarget" onChange={ onChange } availableValues={ ['---'].concat(availableTargets) } selectedValues={ selectedTargets } />
    </div>
  );
}

export default TargetSelectionFilter;