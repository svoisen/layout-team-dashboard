import './BugList.css';
import React from 'react';
import { observer } from 'mobx-react';
import { FIELD_ID, FIELD_IS_OPEN, FIELD_SUMMARY } from '../bugzilla/Constants';

function makeLink(bugId) {
  return `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugId}`;
}

const BugList = observer(({ bugs, columns }) => {
  const headers = columns.map((column, idx) => {
    return (
      <th className={ column.className } key={ `column_${idx}` }>{ column.title }</th>
    )
  });

  const rows = bugs.map((bug, idx) => {
    const cells = columns.map((column, idx) => {
      let contents;
      const classNames = [];
      if (bug[FIELD_IS_OPEN]) {
        classNames.push('open');
      } else {
        classNames.push('closed');
      }

      if (typeof column.property === 'string' && (column.property === FIELD_ID || column.property === FIELD_SUMMARY)) {
        contents = <a href={ makeLink(bug[column.property]) } title={ bug[FIELD_SUMMARY]} >{ bug[column.property] }</a>
      } else if (typeof column.property === 'function') {
        contents = column.property(bug);
      } else {
        contents = bug[column.property];
      }

      return (
        <td key={ `column_${idx}` } className={ classNames.join(' ') }>{ contents }</td>
      )
    });

    return (
      <tr key={ `bug_${idx}` }>
        { cells }
      </tr>
    );
  });

  return (
    <div className="bugList">
      <table>
        <thead>
          <tr>
            { headers }
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
  );
});

export default BugList;