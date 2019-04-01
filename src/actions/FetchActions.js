import { fetchBugs } from '../bugzilla';
import { FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE_DETAIL, FIELD_ASSIGNEE } from '../bugzilla/Constants';

const config = require('../config.json');

function createFetchActions(store) {
  function fetchBacklog() {
    console.log('Fetching backlog');
    fetchBugs({
      fields: [FIELD_ID, FIELD_COMPONENT, FIELD_SUMMARY, FIELD_WHITEBOARD, FIELD_ASSIGNEE, FIELD_ASSIGNEE_DETAIL],
      components: config.layoutComponents,
      whiteboard: '[layout:backlog'
    }).then(data => {
      store.bugs.replace(data.bugs);
    }).catch(error => {
      console.error(error);
    });
  }

  return {
    fetchBacklog
  }
}

export {
  createFetchActions
}