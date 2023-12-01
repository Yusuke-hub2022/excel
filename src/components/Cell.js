import EditForm from "./EditForm";

export default function Cell({ content, row, col, table, tools }) {
  const edit = table.edit;
  const { updateCell } = tools;

  return (
    <td key={col} data-row={row} className={"cell-" + col}>
      {
        edit && row === edit.row && col === edit.col
        ? <EditForm initialText={content} row={row} col={col} updateCell={updateCell} />
        : content
      }
    </td>
  );
}