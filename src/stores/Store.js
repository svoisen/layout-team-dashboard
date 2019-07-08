import { RouterStore } from 'mobx-react-router';
import { observable } from '../../node_modules/mobx/lib/mobx';
import { FIELD_ID } from '../bugzilla/Constants';

const FETCH_STATUS_OK = 'ok';
const FETCH_STATUS_FETCHING = 'fetching';
const FETCH_STATUS_ERROR = 'error';

const COMPLETION_ANY = 'any';
const COMPLETION_COMPLETE = 'complete';
const COMPLETION_INCOMPLETE = 'incomplete';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const SESSION_UI_FILTERS_OPEN = 'ui.filtersOpen';
const SESSION_UI_SUMMARY_OPEN = 'ui.summaryOpen';

function createStore() {
  const filtersOpen = sessionStorage.getItem(SESSION_UI_FILTERS_OPEN);
  const summaryOpen = sessionStorage.getItem(SESSION_UI_SUMMARY_OPEN);

  return {
    bugs: observable([]),
    status: observable.box(FETCH_STATUS_OK),
    sortOrder: SORT_DESC,
    sortField: FIELD_ID,
    charting: {
      burndown: observable({
        needsUpdate: true,
        data: {}
      })
    },
    filters: observable({
      dirty: false,
      quarters: [],
      assignees: [],
      targets: [],
      components: [],
      milestones: [],
      completionStatus: COMPLETION_ANY
    }),
    ui: observable({
      filtersOpen: filtersOpen || false,
      summaryOpen: summaryOpen || false
    }),
    router: new RouterStore()
  };
}

export {
  createStore,
  FETCH_STATUS_OK,
  FETCH_STATUS_ERROR,
  FETCH_STATUS_FETCHING,
  COMPLETION_ANY,
  COMPLETION_COMPLETE,
  COMPLETION_INCOMPLETE,
  SORT_ASC,
  SORT_DESC,
  SESSION_UI_FILTERS_OPEN,
  SESSION_UI_SUMMARY_OPEN
}