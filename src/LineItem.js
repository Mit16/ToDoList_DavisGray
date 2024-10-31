import React from 'react'

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
    <input
      type="checkbox"
      onChange={() => handleCheck(item.id)}
      checked={item.checked}
    />
    <label
      style={item.checked ? { textDecoration: "line-through" } : null}
      onDoubleClick={() => handleCheck(item.id)}
    >
      {item.item}
    </label>
    <button onClick={() => handleDelete(item.id)}>❌</button>
  </li>
)
}

export default LineItem
