import React from 'react';
import { prettyPrintQuarter } from '../util/WhiteboardParsing';

function QuarterSelectionFilter(props) {
  const { selectedQuarters, availableQuarters, onChange } = props;

  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterQuarter">Quarter</label>
      <select multiple defaultValue={ selectedQuarters } id="filterQuarter" onChange={ event => onChange(Array.from(event.target.options).filter(o => o.selected).map(o => o.value)) }>
        { ['---'].concat(availableQuarters).map(quarter => <option key={ quarter } value={ quarter }>{ quarter !== '---' ? prettyPrintQuarter(quarter) : quarter }</option>) }
      </select>
    </div>
  );
}

export default QuarterSelectionFilter;