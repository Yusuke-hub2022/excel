import { render, screen } from '@testing-library/react';
import Excel from './Excel';
import ToolBar from './ToolBar';
import TableHead from './TableHead';
import TableBody from './TableBody';

jest.mock('./ToolBar');
jest.mock('./TableHead');
jest.mock('./TableBody');

ToolBar.mockReturnValue('ToolBar');
TableHead.mockReturnValue('TableHead');
TableBody.mockReturnValue('TableBody');

test('should render', () => {
  const props = { headers: 'headers', initialData: 'initial data'};
  render(<Excel {...props} />);
  expect(screen.getByText('機能一覧')).toBeInTheDocument();
});

test('should child components are called', () => {
  const props = { headers: 'headers', initialData: 'initial data'};
  render(<Excel {...props} />);
  expect(ToolBar).toHaveBeenCalled();
  expect(TableHead).toHaveBeenCalled();
  expect(TableBody).toHaveBeenCalled();
});

