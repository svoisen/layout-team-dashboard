import React from 'react';
import ChartistGraph from 'react-chartist';
import { observer } from 'mobx-react';
import { FIELD_IS_OPEN } from '../bugzilla/index';
import { FETCH_STATUS_FETCHING } from '../stores/Store';
import Loader from './Loader';

const PercentCompleteSummary = observer(({ bugs, dataFetchStatus }) => {
  const classNames = ['percentCompleteSummary', 'summaryItem'];
  const status = dataFetchStatus.get();
  if (status === FETCH_STATUS_FETCHING) {
    classNames.push('loading');
  }

  if (bugs.length === 0) {
    classNames.push('nodata');
  }

  const content = ((status) => {
    if (status === FETCH_STATUS_FETCHING) {
      return <Loader />;
    }

    if (bugs.length === 0) {
      return (<div>No data</div>);
    }

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

    return [
      <ChartistGraph data={ { series: series } } options={ options } type={ 'Pie' } />,
      <div className="title">{ percentComplete }% Complete</div>
    ];
  })(status);

  return (
    <div className={ classNames.join(' ') }>
      { content }
    </div>
  );
});

export default PercentCompleteSummary;