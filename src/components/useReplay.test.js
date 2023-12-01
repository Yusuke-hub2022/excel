import { renderHook, act } from "@testing-library/react";
import useReplay from "./useReplay";
import traceLog from "./traceLog";

jest.mock('./traceLog');

test('default state', () => {
  const { result } = renderHook(() => useReplay());
  expect(result.current.replay.started).toBe(false);
});

test('update state', () => {
  const { result } = renderHook(() => useReplay());
  act(() => result.current.setReplay({started: true}));
  expect(result.current.replay.started).toBe(true);
});