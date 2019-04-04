import React from 'react';
import Multiselect from './Multiselect';

function ComponentSelectionFilter(props) {
  const { selectedComponents, availableComponents, onChange } = props;
  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterComponent">Component</label>
      <Multiselect id="filterComponent" availableValues={ availableComponents } selectedValues={ selectedComponents } onChange={ onChange } />
    </div>
  );
}

export default ComponentSelectionFilter;