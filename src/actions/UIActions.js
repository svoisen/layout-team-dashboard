function createUIActions(store) {
  function setFiltersOpen(open) {
    store.ui.filtersOpen = open;
  }

  function setSummaryOpen(open) {
    store.ui.summaryOpen = open;
  }

  return {
    setSummaryOpen,
    setFiltersOpen
  }
}

export {
  createUIActions
}