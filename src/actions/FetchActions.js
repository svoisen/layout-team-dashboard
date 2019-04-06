import { searchBugs, fetchBugDependencies } from '../bugzilla/Bugzilla';
import { FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL, FIELD_ASSIGNEE, FIELD_IS_OPEN } from '../bugzilla/Constants';

const config = require('../config.json');

function createFetchActions(store) {
  function fetchBacklog() {
    console.log('Fetching backlog');
    const filters = store.filters;
    const assignees = filters.assignees;
    const components = filters.components.length > 0 ? filters.components : config.layoutComponents;
    store.bugs.clear();

    searchBugs({
      fields: [FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE, FIELD_ASSIGNEE_DETAIL, FIELD_IS_OPEN],
      components: components,
      whiteboard: '[layout:backlog',
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