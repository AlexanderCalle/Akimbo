import React from 'react'

const TableCell = ({children}) => {
  return (
    <td className="px-6 py-3">
      {children}
    </td>
  )
}

export default TableCell