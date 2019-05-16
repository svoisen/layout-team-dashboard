import React from 'react';
import { observer } from 'mobx-react';
import { FIELD_IS_OPEN } from '../bugzilla/index';
import CollapsibleView from './CollapsibleView';

const SummaryView = observer(({ bugs, open, onToggle }) => {
  const percentComplete = (bugs.filter(bug => !bug[FIELD_IS_OPEN]).length / bugs.length) * 100;

  return (
    <CollapsibleView title="Summary" open={ open } onToggle={ onToggle }>
      <div className="item">
        <h3>{ percentComplete }%<br />Complete</h3>
      </div>
    </CollapsibleView>
  );
});

export default SummaryView;