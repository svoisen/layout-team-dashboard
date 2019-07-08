import React from 'react';
import ChartistGraph from 'react-chartist';
import { observer } from 'mobx-react';
import './BurndownSummary.css';
import { FETCH_STATUS_FETCHING } from '../stores/Store';
import Loader from './Loader';

const BurndownSummary = observer(({ bugs, dataFetchStatus }) => {
  const classNames = ['burndownSummary', 'summaryItem'];
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

    const series = [[9, 5, 7, 8, 2, 1]];
    const labels = [1, 2, 3, 4];
    const options = {
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
      low: 0,
      axisX: {
        showLabel: false,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: false
      }
    };
    return [
      <ChartistGraph
        data={ { series: series, labels: labels } }
        options={ options }
        type={ 'Line' } />,
      <div className="title">Burndown</div>
    ];
  })(status);

  return (
    <div className={ classNames.join(' ') }>
      { content }
    </div>
  )
});

export default BurndownSummary;