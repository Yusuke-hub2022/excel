import { render, screen } from "@testing-library/react";
import makeTool from "./make-tool";
import traceLog from "./traceLog";
jest.mock('./traceLog');

const logSetTable = jest.fn();

  const getSample = () => ({
    table:{ data: [['data']] },
    setTable: jest.fn(),
    log: [],
    addLog: jest.fn(),
    replay: false,
    setReplay: jest.fn(),
    logSetTable: jest.fn(),
  });

test('logSetTable makes two logs when log is empty', () => {
  const make = makeTool();
  const { table, setTable, log, addLog } = getSample();
  const logSetTable = make.logSetTable(table, setTable, log, addLog);

  logSetTable({some: 'detail'});
  expect(addLog).toHaveBeenCalledTimes(2);
});

test('logSetTable adds one log when log exists', () => {
  const make = makeTool();
  const { table, setTable, log, addLog } = getSample();
  const logSetTable = make.logSetTable(table, setTable, ['log exists'], addLog);

  logSetTable({some: 'detail'});
  expect(addLog).toHaveBeenCalledTimes(1);
});

test('setEdit updates table state', () => {
  const make = makeTool();
  const { logSetTable } = getSample();
  const setEdit = make.setEdit(logSetTable);
  const event = {
    target: {
      dataset: {
        row: 0,
      },
      cellIndex: 1,
    },
  };

  setEdit(event);
  expect(logSetTable).toHaveBeenCalledWith({edit: {row: 0, col: 1}});
});

test('updateCell', () => {
  const make = makeTool();
  const { table, logSetTable } = getSample();
  const updateCell = make.updateCell(table,logSetTable);
  const textInput = {
    dataset: {row: 0, col: 1},
    value: 'A1',
  };
  const event = {
    preventDefault: jest.fn(),
    target: { firstChild: textInput },
  };

  updateCell(event);
  expect(logSetTable).toHaveBeenCalledWith({
    data: [['data', 'A1']],
    edit: null
  });
});

test('sort', () => {
  const make = makeTool();
  const table = {
    data: [['apple', 'bbb'],
           ['orenge', 'aaa']],
    sortby: 0,
    descending: false,
  };
  const logSetTable = jest.fn();
  const sortTable = make.sortTable(table, logSetTable);

  sortTable(0);
  const result = logSetTable.mock.calls[0][1];
  expect(logSetTable).toHaveBeenCalledWith({
    data: [['orenge', 'aaa'],
           ['apple', 'bbb' ]  ],
    sortby: 0,
    descending: true,
  });
});

test('toggleSearch off to on', () => {
  const make = makeTool();
  const table = {search: false, data: [['data']]};
  const logSetTable = jest.fn();
  const toggleSearch = make.toggleSearch(table, logSetTable);

  toggleSearch();
  const result = logSetTable.mock.calls[0][0];
  expect(result).toEqual({search: true, preSearchData: table.data});
});

test('toggleSearch on to off', () => {
  const make = makeTool();
  const table = {search: true, preSearchData: [['preSearchData']]};
  const logSetTable = jest.fn();
  const toggleSearch = make.toggleSearch(table, logSetTable);

  toggleSearch();
  const result = logSetTable.mock.calls[0][0];
  expect(result.search).toBe(false);
  expect(result.data).toBe(table.preSearchData);
});

test('search', () => {
  const make = makeTool();
  const table = {
    preSearchData: [['apple', 'bbb'], ['orange', 'aaa']]
  };
  const logSetTable = jest.fn();
  const search = make.search(table, logSetTable);

  search({ 0: 'apple', 1: '' });
  const result = logSetTable.mock.calls[0][0];
  expect(result.data.length).toBe(1);
});

test('search "APPLE" should match "apple"', () => {
  const make = makeTool();
  const table = {
    preSearchData: [['apple', 'bbb'], ['orange', 'aaa']]
  };
  const logSetTable = jest.fn();
  const search = make.search(table, logSetTable);

  search({ 0: 'APPLE', 1: '' });
  const result = logSetTable.mock.calls[0][0];
  expect(result.data.length).toBe(1);
});

test('render inputForm', () => {
  const inputForm = makeTool().inputForm;

  const form = inputForm('content', 0, 0);
  const { getByRole } = render(form);
  expect(getByRole('textbox')).toBeInTheDocument();
});

const prepareForStartReplay = replay => {
  const make = makeTool();
  const setTable = jest.fn();
  const log = [];
  const setReplay = jest.fn();
  const startRplay = make.startReplay(setTable, log, replay, setReplay);
  return startRplay;
}

test('not start replay', () => {
  traceLog.mockReturnValue('timer');
  const startReplay = prepareForStartReplay({started: false});
  
  startReplay();
  expect(traceLog).not.toHaveBeenCalled();
});

test('replay is running', () => {
  traceLog.mockReturnValue('timer');
  const startReplay = prepareForStartReplay({started: true, timer: 'timer'});
  
  startReplay();
  expect(traceLog).not.toHaveBeenCalled();
});

test('replay just started', () => {
  traceLog.mockReturnValue('timer');
  const startReplay = prepareForStartReplay({started: true, timer: null});
  
  const result = startReplay();
  expect(traceLog).toHaveBeenCalled();
  expect(result).toBe('timer');

});

test('stop replay', () => {
  const make = makeTool();
  const setTable = jest.fn();
  const log = ['log', 'latest log'];
  const replay = {timer: 'timer'};
  const setReplay = jest.fn();
  const stopReplay = make.stopReplay(setTable, log, replay, setReplay);

  stopReplay();
  expect(setTable).toHaveBeenCalledWith('latest log');
})