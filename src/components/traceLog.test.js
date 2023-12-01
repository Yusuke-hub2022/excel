import traceLog from "./traceLog";

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('trace log', () => {
  const log = ['a', 'b'];
  const setReplay = jest.fn();
  const setTable = jest.fn();
  const interval = 10;
  const timer = traceLog(log, setReplay, setTable, interval) ;
  jest.runAllTimers();
  expect(setInterval).toHaveBeenCalledTimes(1);
});