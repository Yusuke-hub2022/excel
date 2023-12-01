import { useReducer } from "react";

export default function useTable(initialData) {
  const [table, setTable] = useReducer(
    (lastData, newDetails) => ({ ...lastData, ...newDetails  }), //差分でも更新できる
    {
      data: initialData,
      sortby: null,
      descending: false,
      edit: null,  // {row: 行番号, col: 列番号}
      search: false,
      preSearchData: null,
      keyword: {},
    }
  );

  return { table, setTable,};
}