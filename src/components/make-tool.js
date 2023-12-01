import traceLog from "./traceLog";

export default function makeTool() {
  const logSetTable = (table, setTable, log, addLog) => newDetail => {
    const makeClone = obj => JSON.parse(JSON.stringify(obj)); 

    if (log.length === 0) {
      addLog(makeClone(table));
    }
    addLog(makeClone({...table, ...newDetail}));
    setTable(newDetail);
  };

  const setEdit = logSetTable => e => {
    const row = parseInt(e.target.dataset.row, 10);
    const col = parseInt(e.target.cellIndex,10);
    logSetTable({edit: {row: row, col: col}});
  };

  const updateCell = (table, logSetTable) => e => {
    e.preventDefault();
    const textInput = e.target.firstChild;
    let safeData = Array.from(table.data);
    const row = textInput.dataset.row;
    const col = textInput.dataset.col;
    const text = textInput.value;

    safeData[row][col] = text;
    logSetTable({
      data: safeData,
      edit: null  // 編集終了
    });
  };

  const sortTable = (table, logSetTable) =>  column => {
    let safeData = Array.from(table.data);
    const descending = table.sortby === column && !table.descending;
    safeData.sort((a, b) => {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });
    const newTable = {
      data: safeData,
      sortby: column,
      descending: descending
    }
    logSetTable(newTable);
  };

  const toggleSearch = (table, logSetTable) => () => {
    if (table.search) {
      logSetTable({
        data: table.preSearchData,
        search: false,
        preSearchData: null,
      });
      return;
    }
    logSetTable({
      search: true,
      preSearchData: Array.from(table.data),
    });
  };

  const search = (table, logSetTable) => keyword => {
    const searchData = table.preSearchData.filter(row => {
      return Object.entries(keyword).every(([col, kw]) => {
        if (!kw) { return true }
        return row[col].toString().toLowerCase().indexOf(kw.toLowerCase()) > -1;
      })
    })
    logSetTable({data: searchData, keyword: keyword});
  };

  const inputForm = (content, row, col) =>
    <form onSubmit={updateCell}>
      <input
        type="text"
        value={content}
        data-row={row}
        data-col={col}
        onChange={e => e}
      />
    </form>;
  
  const startReplay = (setTable, log, replay, setReplay) => () => {
    if (!replay.started) return;
    if (replay.timer) return;
    const timer = traceLog(log, setReplay, setTable, 1000);
    return timer;
  };

  const stopReplay = (setTable, log, replay, setReplay) => () => {
    clearInterval(replay.timer);
    setReplay({timer: null});
    setTable(log[log.length - 1]); // 最新に戻す
  }


  return {
    logSetTable,
    setEdit,
    updateCell,
    sortTable,
    toggleSearch,
    search,
    inputForm,
    startReplay,
    stopReplay,
  }
}