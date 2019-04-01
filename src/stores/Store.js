import { RouterStore } from 'mobx-react-router';
import { observable } from '../../node_modules/mobx/lib/mobx';

function createStore() {
  return {
    bugs: observable([]),
    filters: observable({
      quarters: [],
      assignees: []
    }),
    router: new RouterStore()
  };
}

export {
  createStore
}