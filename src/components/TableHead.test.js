import { render, screen} from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import TableHead from './TableHead';

test('should be rendered', () => {
  const props= {
    headers: ['title-1', 'title-2'],
    table: {sortby: null, descending: false},
    sortTable: jest.fn(),
  }
  render(<TableHead {...props} />)
  expect(screen.getAllByText(/title-./)).toHaveLength(2);
})

test('should have ascending mark', () => {
  const props= {
    headers: ['title-1', 'title-2'],
    table: {sortby: 0, descending: false},
    sortTable: jest.fn(),
  }
  render(<TableHead {...props} />)
  expect(screen.getByText( 'title-1 \u2191'));
})

test('should have descending mark', () => {
  const props= {
    headers: ['title-1', 'title-2'],
    table: {sortby: 0, descending: true},
    sortTable: jest.fn(),
  }
  render(<TableHead {...props} />)
  expect(screen.getByText( 'title-1 \u2193'));
})

test('the function for sort is called when clicked', async () => {
  const user = userEvent.setup();
  const props= {
    headers: ['title-1', 'title-2'],
    table: {sortby: null, descending: false},
    sortTable: jest.fn(),
  }
  render(<TableHead {...props} />);
  const title = screen.getByText('title-1');
  await user.click(title);
  expect(props.sortTable).toHaveBeenCalled();
})