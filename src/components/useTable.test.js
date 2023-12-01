import { render, renderHook, act } from "@testing-library/react";
import useTable from "./useTable";

const initialData = [['A0', 'A1'], ['B0', 'B1']];

test('default status', () => {
  const { result } = renderHook(() => useTable(initialData));
  expect(result.current.table.data).toEqual(initialData);
});

test('update state', () => {
  const { result } = renderHook(() => useTable([['a']]));
  expect(result.current.table.search).toBe(false);
  act(() => result.current.setTable({search: true}));
  expect(result.current.table.search).toBe(true);
});