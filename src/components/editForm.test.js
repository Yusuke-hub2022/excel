import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditForm from './EditForm';

// export default function EditForm({ initialText, row, col, updateCell }) {
// <form onSubmit={updateCell}></form>

test('should render', () => {
  const props = {
    initialText: '',
    row: 0,
    col: 0,
    updateCell: f => f,
  }
  render(<EditForm {...props} />);
  const textbox = screen.getByRole('textbox');
  console.log(textbox.value);
  expect(textbox).toBeInTheDocument();
})

test('user input', async () => {
  const user = userEvent.setup();
  const props = {
    initialText: '',
    row: 0,
    col: 0,
    updateCell: f => f,
  }
  render(<EditForm {...props} />);
  const textbox = screen.getByRole('textbox');
  await user.type(textbox, 'some text');
  expect(textbox.value).toBe('some text');
})