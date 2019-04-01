const BUGZILLA_API_URL = 'https://bugzilla.mozilla.org/rest/bug';

const QUERY_PARAM_FIELDS = 'include_fields';
const QUERY_PARAM_COMPONENT = 'component';
const QUERY_PARAM_WHITEBOARD = 'whiteboard';

function parseJSON(response) {
  return response.json();
}

function checkResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

function fetchBug(id) {
  const URL = new URL(BUGZILLA_API_URL + `/${id}`);
  return fetch(url)
    .then(checkResponse)
    .then(parseJSON);
}

/**
 * 
 * @param {*} query 
 *  @param query.fields
 *  @param query.components 
 */
function searchBugs(query) {
  const url = new URL(BUGZILLA_API_URL);
  url.searchParams.append(QUERY_PARAM_FIELDS, query.fields || []);

  if (query.components) {
    query.components.forEach(component => {
      url.searchParams.append(QUERY_PARAM_COMPONENT, component);
    });
  }

  if (query.whiteboard && query.whiteboard.length > 0) {
    url.searchParams.append(QUERY_PARAM_WHITEBOARD, query.whiteboard);
  }

  return fetch(url)
    .then(checkResponse)
    .then(parseJSON);
}

export {
  searchBugs,
  fetchBug
}