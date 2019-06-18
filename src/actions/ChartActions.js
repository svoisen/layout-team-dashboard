function createChartActions(store) {
  function generateBurndownData({ startDate, endDate }) {
    const events = [];
    const bugs = store.bugs;
    bugs.forEach(bug => {
      if (!bug.is_open && bug.cf_last_resolved) {
        events.push({
          isOpen: false,
          date: new Date(bug.cf_last_resolved)
        });
      }
  
      events.push({
        isOpen: true,
        date: new Date(bug.creation_time)
      });
    });

    let openCount = 0;
    events = events
      .filter(event => event.date >= startDate && event.date <= endDate)
      .sort((a, b) => a.date > b.date)
      .map(event => {
        if (event.isOpen) {
          return { numOpen: ++openCount, ...event };
        } 
  
        return { numOpen: --openCount, ...event };
      });

    return {
      labels: events.map(event => event.date),
      series: events.map(event => event.numOpen)
    }
  }

  return {
    generateBurndownData
  }
}

export default createChartActions;