function extractArrayFromSearchParams(params, varName) {
  const arr = params.getAll(varName);
  if (arr) {
    return arr;
  }

  return [];
}

function createFilterActions(store) {
  function applyFilters() {
    if (!store.filters.dirty) {
      return;
    }

    const search = new URLSearchParams();
    store.filters.quarters.forEach(quarter => search.append('q', quarter));
    store.filters.assignees.forEach(assignee => search.append('a', assignee));
    store.filters.components.forEach(component => search.append('c', component));
    store.filters.targets.forEach(target => search.append('t', target));

    store.filters.dirty = false;
    store.router.push({
      search: '?' + search.toString()
    });
  }

  function updateFilter(filterName, value) {
    store.filters[filterName].replace(value);
    store.filters.dirty = true;
  }

  function updateFiltersFromSearchParams(params) {
    store.filters.quarters.replace(extractArrayFromSearchParams(params, 'q'));
    store.filters.assignees.replace(extractArrayFromSearchParams(params, 'a'));
  }

  return {
    updateFiltersFromSearchParams,
    updateFilter,
    applyFilters
  }
}

export {
  createFilterActions
}