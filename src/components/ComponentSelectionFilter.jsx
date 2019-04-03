import React from 'react';

function ComponentSelectionFilter(props) {
  const { selectedComponents, availableComponents } = props;
  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterComponent">Component</label>
      <select multiple id="filterComponent">
        { availableComponents.map((component, idx) => <option key={ `component_${idx}` } value={ component }>{ component }</option>)}
      </select>
    </div>
  );
}

export default ComponentSelectionFilter;