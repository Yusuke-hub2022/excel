import { render, screen } from '@testing-library/react';
import TableBody from './TableBody';
import SearchBox from './SearchBox';
import TableRow from './TableRow';

jest.mock('./SearchBox');
jest.mock('./TableRow');

test('render', () => {
  SearchBox.mockReturnValue(<p>Search Box</p>);
  TableRow.mockReturnValue(<p>Table Row</p>);

  const props = {
    headers: [],
    table: {data: [['a']]},
    tools: {setEdit: () => null},
  }

  render(<TableBody {...props} />);
  expect(screen.getByText('Search Box')).toBeInTheDocument();
  expect(screen.getByText('Table Row')).toBeInTheDocument();
})