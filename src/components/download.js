
function convertData (data, format) {
  const contents = format === 'json'
    ? JSON.stringify(data)
    : data.reduce((result, row) => {
      const rows = result
        + row.reduce((rowResult, cell, i) => {
          const cells = rowResult
            + '"'
            + cell.replace(/"/g, '""')
            + '"'
            + (i < row.length ? ',' : '');
          return cells;
        }, '')
        + "\n";
      return rows;
    }, '');
  return contents;
}

export function download (data, format, ev) {
  const contents = convertData(data, format);
  const URL = window.URL || window.webkitURL;
  const blob = new Blob([contents], {type: "text/" + format});
  ev.target.href = URL.createObjectURL(blob);
  ev.target.download = "data." + format;
};