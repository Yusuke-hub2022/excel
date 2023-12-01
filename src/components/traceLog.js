
export default function traceLog (log, setReplay, setTable, interval) {
  let index = 0;
  const timer = setInterval(() => {
    if (index >= log.length) {
      setReplay({ running: false });
      clearInterval(timer);
      return;
    }
    setTable(log[index]);
    index++;
  }, interval);
  return timer;
};