import { COMPLETION_ANY } from "../stores/Store";

const SEARCH_PARAM_QUARTER = 'q';
const SEARCH_PARAM_ASSIGNEE = 'a';
const SEARCH_PARAM_COMPONENT = 'c';
const SEARCH_PARAM_TARGET = 't';
const SEARCH_PARAM_MILESTONE = 'm';
const SEARCH_PARAM_COMPLETION_STATUS = 's';

function extractArrayFromSearchParams(params, varName) {
  const arr = params.getAll(varName);
  if (arr) {
    return arr;
  }

  return [];
}

function valueFromSearchParams(params, varName, defaultVal) {
  const val = params.get(varName);
  if (val) {
    return val;
  }

  return defaultVal;
}

function createFilterActions(store) {
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
    search.append(SEARCH_PARAM_COMPLETION_STATUS, store.filters.completionStatus);
    store.filters.dirty = false;
    store.router.push({
      search: '?' + search.toString()
    });
  }

  function updateFilter(filterName, value) {
    if (typeof value === 'array') {
      store.filters[filterName].replace(value);
    } else {
      store.filters[filterName] = value;
    }

    store.filters.dirty = true;
  }

  function updateFiltersFromSearchParams(params) {
    store.filters.quarters.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_QUARTER));
    store.filters.assignees.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_ASSIGNEE));
    store.filters.components.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_COMPONENT));
    store.filters.milestones.replace(extractArrayFromSearchParams(params, SEARCH_PARAM_MILESTONE));
    store.filters.completionStatus = valueFromSearchParams(params, SEARCH_PARAM_COMPLETION_STATUS, COMPLETION_ANY);
  }

  function clearFilters() {
    store.router.push({search: ''});
  }

  return {
    updateFiltersFromSearchParams,
    updateFilter,
    applyFilters,
    clearFilters
  }
}

export {
  createFilterActions
}