import { renderHook, act } from "@testing-library/react";
import useLog from "./useLog";

test('default state', () => {
  const { result } = renderHook(() => useLog());
  expect(result.current.log).toEqual([]);
});

test('update state', () => {
  const { result } = renderHook(() => useLog());
  act(() => result.current.addLog('log1'));
  expect(result.current.log[0]).toBe('log1');
});