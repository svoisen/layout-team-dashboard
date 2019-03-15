import './BugList.css';
import React from 'react';
import { observer } from 'mobx-react';

function makeLink(bugId) {
  return `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugId}`;
}

const BugList = observer(({ bugs }) => {
  const rows = bugs.map(bug => {
    return (
      <tr>
        <td><a href={ makeLink(bug.id) }>{ bug.id }</a></td>
      </tr>
    );
  });

  return (
    <div className="bugList">
      <table>
        <thead>
          <tr>
            <th>ID</th>
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