import logo from './logo.svg';
import './App.css';
import Excel from './components/Excel';

const headers = [
  "タイトル", "出版年", "著者", "言語", "売上部数"
];

const data = [
  ["ドン・キホーテ", "1612 - 1615", "ミゲル・デ・セルバンテス", "スペイン語", "500,000,000"],
  ["二都物語", "1859", "チャールズ・ディケンズ", "英語", "200,000,000"],
  ["指輪物語", "1954 - 1955", "J・R・R・トールキン", "英語", "150,000,000"],
  ["アルケミスト - 夢を旅した少年", "1988", "パウロ・コエーリョ", "ポルトガル語", "150,000,000"],
  ["星の王子さま", "1943", "アントワーヌ・ド・サン＝テグジュペリ", "フランス語", "140,000,000"],
  ["ハリー・ポッターと賢者の石", "1997", "J・K・ローリング", "英語", "107,000,000"],
  ["紅楼夢", "1759 - 1791", "曹雪芹", "中国語", "107,000,000"],
  ["ホビットの冒険", "1937", "J・R・R・トールキン", "英語", "100,000,000"],
  ["そして誰もいなくなった", "1939", "アガサ・クリスティ", "英語", "100,000,000"],
  ["不思議の国のアリス", "1865", "ルイス・キャロル", "英語", "100,000,000"],
  ["思考は現実化する", "1937", "ナポレオン・ヒル", "英語", "100,000,000"]
];

function App() {
  return (
    <Excel initialData={data} headers={headers} />
  );
}

export default App;