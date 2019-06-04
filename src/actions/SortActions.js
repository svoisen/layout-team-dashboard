import { SORT_ASC, SORT_DESC } from '../stores/Store';

function createSortActions(store) {
  function setSortField(field, valueFn) {
    console.log(`Setting sort field to ${field}`);

    if (store.sortField === field) {
      store.sortOrder = store.sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC;
    } else {
      store.sortField = field;
    }

    store.bugs.replace(sort(store.bugs, valueFn));
  }

  function sort(data, valueFn) {
    const sorted = data.slice().sort((a, b) => {
      const valA = valueFn ? valueFn(a) : a[store.sortField];
      const valB = valueFn ? valueFn(b) : b[store.sortField];

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
    sort,
    setSortField
  }
}

export {
  createSortActions
}