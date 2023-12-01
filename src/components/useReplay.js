import { useReducer } from "react";

export default function useReplay() {
  const [ replay, setReplay ] = useReducer(
    (last, newDetails) => ({ ...last, ...newDetails }),
    {started: false, running: false, timer: null}
  );

  return { replay, setReplay };
}