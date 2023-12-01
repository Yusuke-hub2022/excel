import { useState } from "react";

export default function EditForm({ initialText, row, col, updateCell }) {
  const [text, setText] = useState(initialText);

  return (
    <form onSubmit={updateCell}>
      <input
        type="text"
        autoFocus={true}
        value={text}
        data-row={row}
        data-col={col}
        onChange={e => setText(e.target.value)}
      />
    </form>
  )
}