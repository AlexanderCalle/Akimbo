import React from 'react'
import TableRow from '../ui/TableComponent/TableRow'
import TableCell from '../ui/TableComponent/TableCell'
import ButtonEdit from '../ui/ButtonEdit'
import ButtonDelete from '../ui/ButtonDelete'

const UserItem = ({ user }) => {
  return (
    <TableRow>
      <TableCell>{user.firstname + " " + user.lastname}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.bio}</TableCell>
      <TableCell>{user.description}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <ButtonEdit />
          <ButtonDelete />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default UserItem