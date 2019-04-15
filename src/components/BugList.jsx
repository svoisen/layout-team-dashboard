import './BugList.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FIELD_ID, FIELD_IS_OPEN, FIELD_SUMMARY, STATUS_NEW } from '../bugzilla/Constants';
import { STATUS_FETCHING, STATUS_ERROR, STATUS_OK } from '../stores/Store';

function makeLink(bugId) {
  return `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugId}`;
}

function renderMessage(bugs, status) {
  if (status === STATUS_FETCHING) {
    return (
      <div className="message">Fetching bugs &hellip;</div>
    );
  }

  if (status === STATUS_ERROR) {
    return (
      <div className="message error">Error fetching bugs from BMO.</div>
    )
  }

  if (bugs.length === 0) {
    return (
      <div className="message error">No bugs match specified filters.</div>
    );
  }

  return '';
}

const BugList = observer(({ bugs, columns, status }) => {
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
        contents = <a href={ makeLink(bug[FIELD_ID]) } title={ bug[FIELD_SUMMARY]} >{ bug[column.property] }</a>
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
      { renderMessage(bugs, status) }
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

BugList.propTypes = {
  bugs: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired
}

export default BugList;