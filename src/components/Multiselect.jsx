import React from 'react';

function Multiselect(props) {
  const { selectedValues, id, availableValues, onChange } = props;
  return (
    <select multiple value={ selectedValues } id={ id } onChange={ event => onChange(Array.from(event.target.options).filter(option => option.selected).map(option => option.value)) }>
      { availableValues.map((val, idx) => <option key={ `${idx}` } value={ val }>{ val }</option>)}
    </select>
  );
}

export default Multiselect