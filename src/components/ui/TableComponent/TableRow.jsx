import React from 'react'

const TableRow = ({children}) => {
  return (
    <tr className='bg-akimbo-light border-b hover:bg-akimbo-dark-500 hover:bg-opacity-10 '>
      {children}
    </tr>
  )
}

export default TableRow