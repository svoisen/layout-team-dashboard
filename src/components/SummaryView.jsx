import React from 'react';
import './SummaryView.css';
import { observer } from 'mobx-react';
import CollapsibleView from './CollapsibleView';
import PercentCompleteSummary from './PercentCompleteSummary';

const SummaryView = observer(({ bugs, open, onToggle }) => {
  return (
    <CollapsibleView title="Summary" open={ open } onToggle={ onToggle }>
      <PercentCompleteSummary bugs={ bugs } />
    </CollapsibleView>
  );
});

export default SummaryView;