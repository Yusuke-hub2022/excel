import { useEffect } from "react";
import useKeyword from "./useKeyword";

export default function SearchBox({ headers, table, tools }) {
  const { keyword, setKeyword, isEmptyKeyword } = useKeyword(headers);

  const onChange = e => {
    const text = e.target.value;
    const index = e.target.dataset.index;
    setKeyword({[index]: text});
  };

  useEffect(() => {
    if (!table.preSearchData) return;
    tools.search(keyword);
  },[keyword])

  if (!table.search) return null;
  return (
    <tr key="search">
      {headers.map((_, i) => {
        return (
          <td key={i}>
            <input
              type="text"
              data-index={i}
              value={tools.replay.running ? table.keyword[i] : keyword[i]}
              onChange={onChange}
            />
          </td>
        );
      })}
    </tr>
  )
}