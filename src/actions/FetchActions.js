import { searchBugs, fetchBugDependencies } from '../bugzilla/Bugzilla';
import { FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL, FIELD_ASSIGNEE } from '../bugzilla/Constants';

const config = require('../config.json');

function createFetchActions(store) {
  function fetchBacklog() {
    console.log('Fetching backlog');
    searchBugs({
      fields: [FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE, FIELD_ASSIGNEE_DETAIL],
      components: config.layoutComponents,
      whiteboard: '[layout:backlog'
    }).then(data => {
      store.bugs.replace(data.bugs);
    }).catch(error => {
      console.error(error);
    });
  }

  function fetchFissionBacklog() {
    console.log('Fetching Fission backlog');
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