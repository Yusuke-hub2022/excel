import React from "react";
import { useEffect } from "react";
import useTable from "./useTable";
import useReplay from "./useReplay";
import useLog from "./useLog";
import makeTool from "./make-tool";
import ToolBar from "./ToolBar";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Excel({ headers, initialData }) {
  const { table, setTable } = useTable(initialData);
  const { log, addLog } = useLog();
  const { replay, setReplay } = useReplay();

  const make = makeTool();
  const logSetTable = make.logSetTable(table, setTable, log, addLog);
  const tools = {
    replay,
    setReplay,
    logSetTable,
    setEdit: make.setEdit(logSetTable),
    updateCell: make.updateCell(table, logSetTable),
    sortTable: make.sortTable(table, logSetTable),
    toggleSearch: make.toggleSearch(table, logSetTable),
    search: make.search(table, logSetTable),
    inputForm: make.inputForm,
    startReplay: make.startReplay(setTable, log, replay, setReplay),
    stopReplay: make.stopReplay(setTable, log, replay, setReplay),
  }

  useEffect(() => {
    if (replay.started) {
      const timer = tools.startReplay(setTable);
      setReplay({started: false, running: true, timer: timer});
      return;
    }
    if (! replay.running && replay.timer) { // 途中終了
      tools.stopReplay(setTable);
      return;
    }
  },[replay]);

  useEffect(() => {
    document.addEventListener("keydown", e => {
      // alt + shift + R
      if (e.altKey && e.shiftKey && e.code === "KeyR") {
        setReplay({started: true, running: true});
      }
      if (e.code === "Escape") {
        setReplay({running: false});
      }
    })
  },[]);

  return(
    <React.Fragment key="contena">
      <ToolBar table={table} tools={tools} log={log} />
      <table className={replay.running ? "replay" : ""}>
        <TableHead headers={headers} table={table} sortTable={tools.sortTable} />
        <TableBody
          headers={headers}
          table={table}
          tools={tools}
        />
      {/**
       */}
      </table>
      <h2>機能一覧</h2>
      <ul>
        <li>検索</li>
        <li>リプレイ（Escキーで終了）</li>
        <li>ファイルダウンロード（JSON, CSV形式）</li>
        <li>昇順・降順で並び替え（項目名をクリック）</li>
        <li>セル編集（セルをダブルクリック。Enterで決定）</li>
      </ul>
    </React.Fragment>
  );
}
