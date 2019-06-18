import React from 'react';
import ChartistGraph from 'react-chartist';
import { observer } from 'mobx-react';
import { FIELD_IS_OPEN } from '../bugzilla/index';

const PercentCompleteSummary = observer(({ bugs }) => {
  const numOpen = bugs.filter(bug => bug[FIELD_IS_OPEN]).length;
  const numClosed = bugs.length - numOpen;
  const percentComplete = Math.round(numClosed / bugs.length * 100);
  const series = [numClosed, numOpen];
  const options = {
    donut: true,
    startAngle: 270,
    total: bugs.length * 2,
    donutWidth: 20,
    showLabel: false,
  };

  return (
    <div className="percentCompleteSummary summaryItem">
      <ChartistGraph data={ { series: series } } options={ options } type={ 'Pie' } />
      <div class="title">{ percentComplete }% Complete</div>
    </div>
  );
});

export default PercentCompleteSummary;