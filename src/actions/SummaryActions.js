function createSummaryActions(store) {
  function setSummaryOpen(open) {
    store.ui.summaryOpen = open;
  }

  return {
    setSummaryOpen
  }
}

export {
  createSummaryActions
}