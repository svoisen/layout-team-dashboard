import { RouterStore } from 'mobx-react-router';
import { observable } from '../../node_modules/mobx/lib/mobx';

function createStore() {
  return {
    bugs: observable([]),
    filters: observable({
      open: false,
      dirty: false,
      quarters: [],
      assignees: [],
      targets: [],
      components: [],
      milestones: []
    }),
    router: new RouterStore()
  };
}

export {
  createStore
}