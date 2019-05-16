import React from 'react';
import './CollapsibleView.css';

const CollapsibleView = ({ className, open, title, children, onToggle }) => {
  const classNames = ['collapsibleView', className].join(' ');
  
  return (
    <details className={ classNames } open={ open } onToggle={ onToggle }>
      <summary className="title">{ title }</summary>
      <div className="contents">
        { children }
      </div>
    </details>
  );
}

export default CollapsibleView;