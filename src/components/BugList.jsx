import './BugList.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FIELD_ID, FIELD_IS_OPEN, FIELD_SUMMARY, STATUS_NEW } from '../bugzilla/Constants';
import { FETCH_STATUS_FETCHING, FETCH_STATUS_ERROR } from '../stores/Store';

function makeLink(bugId) {
  return `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugId}`;
}

function renderMessage(bugs, status) {
  if (status === FETCH_STATUS_FETCHING) {
    return (
      <div className="message">Fetching bugs &hellip;</div>
    );
  }

  if (status === FETCH_STATUS_ERROR) {
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

const BugList = observer(({ bugs, columns, status, onHeaderClick }) => {
  const headers = columns.map((column, idx) => {
    return (
      <th className={ column.className } key={ `column_${idx}` } onClick={ () => onHeaderClick(column.field, column.value) }>{ column.title }</th>
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

      if (column.field === FIELD_ID || column.field === FIELD_SUMMARY) {
        contents = <a href={ makeLink(bug[FIELD_ID]) } title={ bug[FIELD_SUMMARY]} >{ column.value(bug) }</a>
      } else if (typeof column.value === 'function') {
        contents = column.value(bug);
      } else {
        contents = bug[column.field];
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