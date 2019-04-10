import React from 'react';
import './FilterControls.css';

function FilterControls(props) {
  const { applyDisabled, onApplyClick, onClearClick } = props;

  return (
    <div className="filterControls">
      <button className="apply" disabled={ applyDisabled } onClick={ onApplyClick }>Apply</button>
      <button className="clear" onClick={ onClearClick }>Clear All</button>
    </div>
  )
}

export default FilterControls;