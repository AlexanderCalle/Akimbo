import React from 'react'
import TableRow from '../ui/TableComponent/TableRow'
import TableCell from '../ui/TableComponent/TableCell'
import ButtonEdit from '../ui/ButtonEdit'
import ButtonDelete from '../ui/ButtonDelete'
import { useNavigate } from 'react-router-dom'

const CtaItem = ({cta, onDelete}) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/cta/update/${cta.id}`)
  }

  const handleDelete = () => {
    onDelete(cta)
}

  return (
    <TableRow>
      <TableCell>{cta.title}</TableCell>
      <TableCell>{cta.description}</TableCell>
      <TableCell>{cta.start_date?.toDate().toDateString()}</TableCell>
      <TableCell>{cta.end_date?.toDate().toDateString()}</TableCell>
      <TableCell>
        <div className="flex items-start justify-start">
          <ButtonEdit handleUpdate={handleEdit} />
          <ButtonDelete handleDelete={handleDelete} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default CtaItem