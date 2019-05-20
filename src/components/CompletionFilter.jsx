import React from 'react';
import './CompletionFilter.css';

function CompletionFilter(props) {
  const { anyValue, completeValue, incompleteValue, selectedValue, onChange } = props;
  return (
    <div className="filter filter__vertical completionFilter">
      <label htmlFor="filterCompletion">Completion Status</label>
      <select value={ selectedValue } id="filterCompletion" onChange={ event => onChange(event.target.value) }>
        <option value={ anyValue }>Any</option>
        <option value={ completeValue }>Complete</option>
        <option value={ incompleteValue }>Incomplete</option>
      </select>
    </div>
  )
}

export default CompletionFilter;