import Cell from "./Cell";

export default function TableRow({ row, rowIndex, table, tools }) {
  return(
    <tr key={rowIndex}>
      {row.map((content, index) =>
        <Cell key={index}
          content={content}
          row={rowIndex}
          col={index}
          table={table}
          tools={tools}
        />
      )}
    </tr>
  );
}