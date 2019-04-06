const regex = /\[layout\:backlog\:([0-9a-zA-Z]*)\:?([0-9]*)?\]/;

function extractQuarter(str) {
  const res = str.match(regex);
  if (res && res.length > 1 && res[1]) {
    const dateStr = res[1];
    return prettyPrintQuarter(dateStr);
  }

  return "None";
}

function prettyPrintQuarter(dateStr) {
  return dateStr.substring(0, 4) + ' ' + dateStr.substring(4).toUpperCase();
}

function extractTarget(str) {
  const res = str.match(regex)
  if (res && res.length > 2 && res[2]) {
    return `${res[2]}`;
  }

  return "None";
}

export {
  extractQuarter,
  prettyPrintQuarter,
  extractTarget
}