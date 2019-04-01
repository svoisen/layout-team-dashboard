const config = require('../config.json');

function extractArrayFromSearchParams(params, varName) {
  let arr = params.get(varName);
  if (arr) {
    return arr.split(',');
  }

  return [];
}

function createFilterActions(store) {
  function applyFilters(filters) {
    const search = new URLSearchParams();
    search.set('q', filters.quarters.join(','));
    store.router.push('?' + search.toString());
  }

  function updateFiltersFromSearchParams(params) {
    const quarters = extractArrayFromSearchParams(params, 'q');
    if (quarters.length === 0) {
      store.filters.quarters = config.quarters.slice();
    } else {
      store.filters.quarters = quarters;
    }

    const assignees = extractArrayFromSearchParams(params, 'a');
    if (assignees.length === 0) {
      store.filters.assignees = config.team.slice();
    } else {
      store.filters.assignees = assignees;
    }
  }

  return {
    updateFiltersFromSearchParams,
    applyFilters
  }
}

export {
  createFilterActions
}