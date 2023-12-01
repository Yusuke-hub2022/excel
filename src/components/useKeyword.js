import { useReducer } from "react";

export default function useKeyword(headers) {
  const defaulKeyword = headers
    .map((_, i) => i)
      .reduce((acum, i) => ({...acum, [i]:""}), {});

  const [keyword, setKeyword] = useReducer(
    (previous, newDetail) => {
      return {...previous, ...newDetail}
    },
    defaulKeyword // {1: "", 2: "", ...}
  );

  const isEmptyKeyword = () => Object.values(keyword).every(v => v === '');

  return { keyword, setKeyword, isEmptyKeyword }
}