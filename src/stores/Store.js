import { RouterStore } from 'mobx-react-router';

function createStore() {
  return {
    router: new RouterStore()
  };
}

export {
  createStore
}