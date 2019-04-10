import { searchBugs, fetchBugDependencies } from '../bugzilla/Bugzilla';
import { FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL, FIELD_ASSIGNEE, FIELD_IS_OPEN } from '../bugzilla/Constants';

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
  function fetchBacklog() {
    console.log('Fetching backlog');
    const filters = store.filters;
    const assignees = filters.assignees;
    const components = filters.components.length > 0 ? filters.components : config.layoutComponents;
    const whiteboard = buildBacklogWhiteboardRegex(filters.quarters, filters.targets);
    store.bugs.clear();

    searchBugs({
      fields: [FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE, FIELD_ASSIGNEE_DETAIL, FIELD_IS_OPEN],
      components: components,
      whiteboard: whiteboard,
      assignees: assignees
    }).then(data => {
      store.bugs.replace(data.bugs);
    }).catch(error => {
      console.error(error);
    });
  }

  function fetchFissionBacklog() {
    console.log('Fetching Fission backlog');
    store.bugs.clear();

    fetchBugDependencies(config.metabugs.fission)
      .then(data => {
        store.bugs.replace(data.bugs);
      })
      .catch(error => {
        console.error(error);
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