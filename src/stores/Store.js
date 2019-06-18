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

function createStore() {
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
      filtersOpen: false,
      summaryOpen: false
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
  SORT_DESC
}