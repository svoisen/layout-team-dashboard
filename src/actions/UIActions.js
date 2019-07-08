import { SESSION_UI_FILTERS_OPEN, SESSION_UI_SUMMARY_OPEN } from "../stores/Store";

function createUIActions(store) {
  function setFiltersOpen(open) {
    store.ui.filtersOpen = open;
    sessionStorage.setItem(SESSION_UI_FILTERS_OPEN, open);
  }

  function setSummaryOpen(open) {
    store.ui.summaryOpen = open;
    sessionStorage.setItem(SESSION_UI_SUMMARY_OPEN, open);
  }

  return {
    setSummaryOpen,
    setFiltersOpen
  }
}

export {
  createUIActions
}