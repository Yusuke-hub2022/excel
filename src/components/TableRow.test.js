import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';
import Cell from './Cell';
jest.mock('./Cell');

test('should be rendered', () => {
  Cell.mockReturnValue(<td>Cell</td>);
  const props = {
    row: ['a', 'b'],
    rowIndex: 0,
    table: {},
    tools: {}
  };
  render(<TableRow {...props} />);
  const cells = screen.getAllByText('Cell');
  expect(cells.length).toBe(2);
})