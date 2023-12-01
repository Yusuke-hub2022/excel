import SearchBox from "./SearchBox";
import TableRow from "./TableRow";

export default function TableBody({ headers, table, tools }) {

  return(
    <tbody key="tbody" onDoubleClick={tools.setEdit}>
      <SearchBox
        headers={headers}
        table={table}
        tools={tools}
      />
      {table.data.map((row, i) =>
        <TableRow key={`tableRow_${row[0]}`} row={row} rowIndex={i} table={table} tools={tools} />
      )}
    </tbody>
  );
}
