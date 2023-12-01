import { download } from './download';

export default function ToolBar({ table, tools, log }) { // tools は table の tool
  const handleReplay = () =>  {
    if (log.length === 0) {
      alert("まだリプレイする操作がありません。");
      return;
    }

    /** 
     *  logのない状態で実行すると、Firefox で下記のエラーになる。
     *  Chrome では出ない。表示して何もせずいきなりステートを変更するのがよくない？
     * 
     *    Error: Should not already be working
     */
    tools.setReplay({started: true, running: true});
  }

  const makeHandle = (data, format) => ev => download(data, format, ev);

  return (
    <div className="toolBar">
      <a href="#" onClick={tools.toggleSearch}>検索</a>
      <a href="#" onClick={handleReplay}>リプレイ</a>
      <a href="#" onClick={makeHandle(table.data, 'json')}>JSONで保存</a>
      <a href="#" onClick={makeHandle(table.data, 'csv')}>CSVで保存</a>
    </div>
  )
}


