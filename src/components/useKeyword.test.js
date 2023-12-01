import { renderHook, act } from "@testing-library/react";
import useKeyword from "./useKeyword";

const headers = ['a', 'b'];

test('keyword is empty at first', () => {
  const { result } = renderHook(() => useKeyword(headers));
  //console.log(result.current.keyword);
  const allEmpty = Object.values(result.current.keyword).every(v => v === '');
  expect(allEmpty).toBe(true);
  expect(result.current.isEmptyKeyword()).toBe(true);
});

test('update keyword', () => {
  const { result } = renderHook(() => useKeyword(headers));
  act(() => result.current.setKeyword({1: 'keyword-1'}));
  expect(result.current.keyword[1]).toBe('keyword-1');
})