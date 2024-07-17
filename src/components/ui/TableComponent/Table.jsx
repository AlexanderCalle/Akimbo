import React from 'react'

const Table = ({children}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-akimbo-dark-500 border border-akimbo-dark-900">
      {children}
    </table>
  )
}

export default Table