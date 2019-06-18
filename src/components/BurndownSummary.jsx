import React from 'react';
import ChartistGraph from 'react-chartist';
import { observer } from 'mobx-react';

const BurndownSummary = observer(() => {
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
    }
  };

  return (
    <div className="burndownSummary summaryItem">
      <ChartistGraph
        data={ { series: series, labels: labels } }
        options={ options }
        type={ 'Line' } />
    </div>
  )
});

export default BurndownSummary;