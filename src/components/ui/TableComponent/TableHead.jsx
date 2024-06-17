import React from 'react'

const TableHead = ({children}) => {
  return (
    <thead className="text-gray-700 bg-akimbo-dark-500 bg-opacity-10 border-b border-akimbo-dark-200">
      {children}
    </thead>
  )
}

export default TableHead