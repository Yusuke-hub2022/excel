import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';
//import useKeyword from './useKeyword';
//jest.mock('./SearchBox');

const propsDefault = {
  headers: ["head1", "head2"],
  table: {
    data: [["data1", "data2"]],
    search: false,
    preSearchData: null,
  },
  tools: {
    search: jest.fn((_) => 'search'),
    replay: {running: false},
  },
}

const propsSearch = {
  headers: ["head1", "head2"],
  table: {
    data: [["data1", "data2"]],
    search: true,
    preSearchData: [['some', 'data']], // <-- search
  },
  tools: {
    search: jest.fn((_) => 'search'),
    replay: {running: false},
  },
}

const propsReplay = {
  headers: ["head1", "head2"],
  table: {
    data: [["data1", "data2"]],
    search: true,
    keyword: {0: 'keyword in table status', 1: ''}
  },
  tools: {
    search: jest.fn((_) => 'search'),
    replay: {running: true}, // <-- replay mode
  },
}

test('should not be rendered and searched', () => {
  render(<SearchBox {...propsDefault} />);
  expect(screen.queryAllByRole('textbox').length).toBe(0);
  expect(propsDefault.tools.search).not.toHaveBeenCalled();
})

test('should be renderd', async () => {
  render(<SearchBox {...propsSearch} />);
  const textboxes = screen.getAllByRole('textbox');
  expect(textboxes.length).toBe(2);
})

test('type kyeword, and search runs', async () => {
  const user = userEvent.setup();
  render(<SearchBox {...propsSearch} />);
  const textbox = screen.getAllByRole('textbox');
  await user.type(textbox[0], 'aaa');
  expect(propsSearch.tools.search).toHaveBeenCalled();
})

test('have value in table status when replay mode', () => {
  render(<SearchBox {...propsReplay} />);
  const textboxes = screen.getAllByRole('textbox');
  expect(textboxes[0].value).toBe('keyword in table status');
})