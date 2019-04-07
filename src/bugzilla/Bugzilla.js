const BUGZILLA_API_URL = 'https://bugzilla.mozilla.org/rest/bug';

const QUERY_PARAM_FIELDS = 'include_fields';
const QUERY_PARAM_COMPONENT = 'component';
const QUERY_PARAM_WHITEBOARD = 'whiteboard';
const QUERY_PARAM_WHITEBOARD_TYPE = 'status_whiteboard_type';
const QUERY_PARAM_ASSIGNEE = 'assigned_to';

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
 * Fetch a specific bug. 
 * @param {number} id 
 */
function fetchBug(id) {
  const url = new URL(BUGZILLA_API_URL + `/${id}`);
  return runFetch(url);
}

/**
 * Fetch a collection of bugs. 
 * @param {array} ids 
 */
function fetchBugs(ids) {
  const url = new URL(BUGZILLA_API_URL + '?id=' + ids.join(','));
  return runFetch(url)
}

/**
 * Fetch all of the dependencies of a given bug.
 * @param {number} id 
 */
function fetchBugDependencies(id) {
  return fetchBug(id)
    .then(data => {
      if (data.bugs && data.bugs.length > 0) {
        const dependsOn = data.bugs[0].depends_on;
        if (Array.isArray(dependsOn)) {
          return fetchBugs(dependsOn);
        }

        return Promise.error(`No dependencies found for bug ${id}`);
      } 

      return Promise.error(`No bug found with ID ${id}`);
    });
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

  if (query.assignees) {
    query.assignees.forEach(assignee => {
      url.searchParams.append(QUERY_PARAM_ASSIGNEE, assignee);
    });
  }

  // if (query.whiteboard && query.whiteboard.length > 0) {
  //   query.whiteboard.forEach(whiteboard => {
  //     url.searchParams.append(QUERY_PARAM_WHITEBOARD, whiteboard);
  //   });
  // }

  if (query.whiteboard) {
    url.searchParams.set(QUERY_PARAM_WHITEBOARD, query.whiteboard);
  }

  url.searchParams.append(QUERY_PARAM_WHITEBOARD_TYPE, 'regexp');
  return runFetch(url);
}

function runFetch(url) {
  return fetch(url)
    .then(checkResponse)
    .then(parseJSON);
}

export {
  searchBugs,
  fetchBug,
  fetchBugs,
  fetchBugDependencies
}