import { SORT_ASC } from '../stores/Store';

function createSortActions(store) {
  function sort(data) {
    const sorted = data.slice().sort((a, b) => {
      const valA = a[store.sortField];
      const valB = b[store.sortField];

      if (valA > valB) {
        return store.sortOrder === SORT_ASC ? 1 : -1;
      }

      if (valA < valB) {
        return store.sortOrder === SORT_ASC ? -1 : 1;
      }

      return 0;
    });

    return sorted;
  }

  return {
    sort
  }
}

export {
  createSortActions
}