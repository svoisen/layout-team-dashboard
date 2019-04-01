function extractQuarter(str) {
  const res = str.match(/\[layout\:backlog\:(.*)\]/);
  if (res && res.length > 1) {
    const dateStr = res[1];
    return prettyPrintQuarter(dateStr);
  }

  return undefined;
}

function prettyPrintQuarter(dateStr) {
  return dateStr.substring(0, 4) + ' ' + dateStr.substring(4).toUpperCase();
}

export {
  extractQuarter,
  prettyPrintQuarter
}