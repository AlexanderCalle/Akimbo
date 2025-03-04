import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UpdatePublishStateArticle } from '../../services/Articles';
import TableRow from '../ui/TableComponent/TableRow';
import TableCell from '../ui/TableComponent/TableCell';
import Button from '../ui/Button';
import ButtonPreview from '../ui/ButtonPreview';
import ButtonEdit from '../ui/ButtonEdit';
import ButtonDelete from '../ui/ButtonDelete';

const PlannedArticle = ({ article }) => {
  const [isPublished, setIsPublished] = useState(article.isPublished);

  const navigate = useNavigate();

  const handleUpdatePublish = () => {
      setIsPublished((prev) => !prev);

      toast.promise(
          UpdatePublishStateArticle({
              docId: article.id,
              isPublished: !isPublished
          }),
          {
              loading: isPublished ? "Deactivate..." : "Activate...",
              success: <b>Article {isPublished ? "Deactivated": "Published"}</b>,
              error: <b>Problem updating article</b>,
          }
      )
  }

  return (
    <TableRow>
      <TableCell>{article.title}</TableCell>
      <TableCell>{article.author}</TableCell>
      <TableCell>{article.cat}</TableCell>
      <TableCell>{article.start_date?.toDate().toDateString()} </TableCell>
      <td className="px-6 py-3">
          <Button handleClick={handleUpdatePublish}>
              {isPublished ? "Deactivate" : "Activate"}
          </Button>
      </td>
    </TableRow>
  )
}

export default PlannedArticle