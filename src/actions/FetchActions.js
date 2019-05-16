import { searchBugs, fetchBugDependencies } from '../bugzilla/Bugzilla';
import { FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL, FIELD_ASSIGNEE, FIELD_IS_OPEN, FIELD_FISSION_MILESTONE } from '../bugzilla/Constants';
import { STATUS_ERROR, STATUS_OK, STATUS_FETCHING } from '../stores/Store';

const config = require('../config.json');

function buildBacklogWhiteboardRegex(quarters, targets) {
  let unassignedIdx = -1;
  let regexp = config.backlogPrefix;
  if (quarters && quarters.length > 0) {
    unassignedIdx = quarters.indexOf('---');
    if (unassignedIdx > -1) {
      quarters.splice(unassignedIdx, 1);
    }

    if (quarters.length > 0) {
      if (unassignedIdx > -1) {
        regexp += '(';
      }
      regexp += '\\:(' + quarters.join('|') + ')';
      if (unassignedIdx > -1) {
        regexp += ')?'
      }
    }
  } else {
    regexp += '(\\:[0-9A-Za-z]+)?';
  }

  unassignedIdx = -1;
  if (targets && targets.length > 0) {
    unassignedIdx = targets.indexOf('---');
    if (unassignedIdx > -1) {
      targets.splice(unassignedIdx, 1);
    }
    regexp += '(\\:(' + targets.join('|') + '))';
    if (unassignedIdx > -1) {
      regexp += '?';
    }
  } else {
    regexp += '(\\:[0-9]+)?';
  }

  regexp += '\\]';

  return regexp;
}

function createFetchActions(store) {
  function startFetch() {
    store.bugs.clear();
    store.status.set(STATUS_FETCHING);
  }

  function endFetch(error) {
    if (error) {
      store.status.set(STATUS_ERROR);
    } else {
      store.status.set(STATUS_OK);
    }
  }

  function fetchBacklog() {
    console.log('Fetching backlog');
    const filters = store.filters;
    const assignees = filters.assignees;
    const components = filters.components.length > 0 ? filters.components : undefined;
    const whiteboard = buildBacklogWhiteboardRegex(filters.quarters, filters.targets);

    startFetch();
    searchBugs({
      fields: [FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE, FIELD_ASSIGNEE_DETAIL, FIELD_IS_OPEN],
      components: components,
      whiteboard: whiteboard,
      assignees: assignees
    }).then(data => {
      store.bugs.replace(data.bugs);
      endFetch();
    }).catch(error => {
      console.error(error);
      endFetch(error);
    });
  }

  function fetchFissionBacklog() {
    console.log('Fetching Fission backlog');
    const filters = store.filters;
    const milestones = filters.milestones;
    const assignees = filters.assignees;

    startFetch();
    fetchBugDependencies(config.metabugs.fission)
      .then(data => {
        const bugs = data.bugs.filter(bug => {
          let matches = true;
          if (matches && milestones.length > 0) {
            const milestone = bug[FIELD_FISSION_MILESTONE];
            matches = milestones.indexOf(milestone) > -1;
          }

          if (matches && assignees.length > 0) {
            const assignee = bug[FIELD_ASSIGNEE_DETAIL]['nick'];
            matches = assignees.indexOf(assignee) > -1;
          }

          return matches;
        });
        store.bugs.replace(bugs);
        endFetch();
      })
      .catch(error => {
        console.error(error);
        endFetch(error)
      });
  }

  return {
    fetchBacklog,
    fetchFissionBacklog
  }
}

export {
  createFetchActions
}