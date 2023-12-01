import { useReducer } from "react";

export default function useLog() {
  const [log, addLog] = useReducer(
    (log, newTable) => {
      return [...log, newTable];
    },
    []
  );

  return { log, addLog };
}
