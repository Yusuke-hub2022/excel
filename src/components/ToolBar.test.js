import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolBar from './ToolBar';
import { download } from './download';

jest.mock('./download');
download.mockReturnValue('download');

const props = {
  table: [],
  tools: {
    setReplay: jest.fn(_ => 'setReplay'),
    toggleSearch: jest.fn(e => null),
  },
  log: [],
  replay: null,
};

test('click 検索', async () => {
  const user = userEvent.setup();
  render(<ToolBar {...props} />);

  const search = screen.getByText('検索');
  await user.click(search);
  expect(props.tools.toggleSearch).toHaveBeenCalled();
});

test('should not replay when log is empty', async () => {
  const user = userEvent.setup();
  render(<ToolBar {...props} />);
  const replay = screen.getByText('リプレイ');
  await user.click(replay);
  expect(props.tools.setReplay).not.toHaveBeenCalled();
});

test('should replay when log is exists', async () => {
  const user = userEvent.setup();
  const withLog = { ...props, log: ['a']}
  render(<ToolBar {...withLog} />);
  const replay = screen.getByText('リプレイ');
  await user.click(replay);
  expect(props.tools.setReplay).toHaveBeenCalled();
});

test('download', async () => {
  const user = userEvent.setup();
  render(<ToolBar {...props} />);
  const jsonButton = screen. getByText('JSONで保存');
  const csvButton = screen. getByText('CSVで保存');
  await user.click(jsonButton);
  await user.click(csvButton);
  expect(download.mock.calls.length).toBe(2);
});