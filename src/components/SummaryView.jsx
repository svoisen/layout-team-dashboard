import React from 'react';
import './SummaryView.css';
import { observer } from 'mobx-react';
import CollapsibleView from './CollapsibleView';
import PercentCompleteSummary from './PercentCompleteSummary';
import BurndownSummary from './BurndownSummary';

const SummaryView = observer(({ bugs, open, onToggle }) => {
  return (
    <CollapsibleView className="summaryView" title="Summary" open={ open } onToggle={ onToggle }>
      <PercentCompleteSummary bugs={ bugs } />
      <BurndownSummary bugs={ bugs } />
    </CollapsibleView>
  );
});

export default SummaryView;