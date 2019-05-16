import { RouterStore } from 'mobx-react-router';
import { observable } from '../../node_modules/mobx/lib/mobx';

const STATUS_OK = 'ok';
const STATUS_FETCHING = 'fetching';
const STATUS_ERROR = 'error';

function createStore() {
  return {
    bugs: observable([]),
    status: observable.box(STATUS_OK),
    filters: observable({
      dirty: false,
      quarters: [],
      assignees: [],
      targets: [],
      components: [],
      milestones: []
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
  STATUS_OK,
  STATUS_ERROR,
  STATUS_FETCHING
}