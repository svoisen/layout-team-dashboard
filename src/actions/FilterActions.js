const SEARCH_PARAM_QUARTER = 'q';
const SEARCH_PARAM_ASSIGNEE = 'a';
const SEARCH_PARAM_COMPONENT = 'c';
const SEARCH_PARAM_TARGET = 't';
const SEARCH_PARAM_MILESTONE = 'm';

function extractArrayFromSearchParams(params, varName) {
  const arr = params.getAll(varName);
  if (arr) {
    return arr;
  }

  return [];
}

function createFilterActions(store) {
  function setFiltersOpen(open) {
    store.filters.open = open;
  }

  function applyFilters() {
    if (!store.filters.dirty) {
      return;
    }

    const search = new URLSearchParams();
    store.filters.quarters.forEach(quarter => search.append(SEARCH_PARAM_QUARTER, quarter));
    store.filters.assignees.forEach(assignee => search.append(SEARCH_PARAM_ASSIGNEE, assignee));
    store.filters.components.forEach(component => search.append(SEARCH_PARAM_COMPONENT, component));
    store.filters.targets.forEach(target => search.append(SEARCH_PARAM_TARGET, target));
    store.filters.milestones.forEach(milestone => search.append(SEARCH_PARAM_MILESTONE, milestone));
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
    store.filters.quarters.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_QUARTER));
    store.filters.assignees.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_ASSIGNEE));
    store.filters.components.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_COMPONENT));
    store.filters.milestones.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_MILESTONE));
  }

  function clearFilters() {
    store.router.push({search: ''});
  }

  return {
    updateFiltersFromSearchParams,
    updateFilter,
    applyFilters,
    clearFilters,
    setFiltersOpen
  }
}

export {
  createFilterActions
}