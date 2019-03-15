const BUGZILLA_API_URL = 'https://bugzilla.mozilla.org/rest/bug';

const QUERY_PARAM_FIELDS = 'include_fields';
const QUERY_PARAM_COMPONENT = 'component';

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

/**
 * 
 * @param {*} query 
 *  @param query.fields
 *  @param query.components 
 */
function fetchBugs(query) {
  const url = new URL(BUGZILLA_API_URL);
  url.searchParams.append(QUERY_PARAM_FIELDS, query.fields || []);

  if (query.components) {
    query.components.forEach(component => {
      url.searchParams.append(QUERY_PARAM_COMPONENT, component);
    });
  }

  return fetch(url)
    .then(checkResponse)
    .then(parseJSON);
}

export {
  fetchBugs
}