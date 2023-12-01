
export default function TableHead({ headers, table, sortTable }) {
  return(
    <thead key="thead">
      <tr key="theadRow">
        {headers.map((element, i) => {
          let title = element
          if (i === table.sortby) {
            title += table.descending ? ' \u2193' : ' \u2191';
          }
          return (
            <th key={i} onClick={() => sortTable(i)}>
              {title}
            </th>
          );
        })}
      </tr>
    </thead>
  )
}
