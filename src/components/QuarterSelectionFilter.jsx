import React from 'react';
import { prettyPrintQuarter } from '../util/WhiteboardParsing';

function QuarterSelectionFilter(props) {
  const { selectedQuarters, availableQuarters } = props;

  return (
    <div className="filter filter__vertical">
      <label htmlFor="filterQuarter">Quarter</label>
      <select multiple defaultValue={ selectedQuarters } id="filterQuarter">
        { availableQuarters.map(quarter => <option key={ quarter } value={ quarter }>{ prettyPrintQuarter(quarter) }</option>) }
      </select>
    </div>
  );
}

export default QuarterSelectionFilter;