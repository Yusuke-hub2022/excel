import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import EditForm from './editForm';
jest.mock('./editForm');

// export default function Cell({ content, row, col, table, tools }) {
// ? <EditForm initialText={content} row={row} col={col} updateCell={updateCell} />

test('should render', () => {
  EditForm.mockReturnValue('edit form');
  const props = {
    content: 'content',
    row: 0,
    col: 0,
    table: {edit: null},
    tools: {updateCell: () => null},
  };
  render(<Cell {...props} />);
  expect(screen.getByText(props.content)).toBeInTheDocument();
})

test('should call input form', () => {
  EditForm.mockReturnValue('edit form');
  const props = {
    content: 'content',
    row: 0,
    col: 0,
    table: {edit: {row: 0, col: 0}},
    tools: {updateCell: () => null},
  };
  render(<Cell {...props} />);
  expect(EditForm).toHaveBeenCalled();
})