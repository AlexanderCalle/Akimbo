import React from 'react'
import { useNavigate } from 'react-router-dom';
import TableRow from '../ui/TableComponent/TableRow';
import TableCell from '../ui/TableComponent/TableCell';
import ButtonPreview from '../ui/ButtonPreview';
import ButtonEdit from '../ui/ButtonEdit';
import ButtonDelete from '../ui/ButtonDelete';

const OverviewDiaryItem = ({article, onDelete}) => {

    const navigate = useNavigate();

    const handlePreview = () => {
        navigate(`/dashboard/diary/preview/${article.id}`);
    }

    const handleUpdate = () => {
        navigate("/dashboard/diary/update/" + article.id);
    }

    const handleDelete = () => {
        onDelete(article)
    }

    return (
        <TableRow>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.author}</TableCell>
            <TableCell>{article.created_date.toDate().toDateString()}</TableCell>
            <TableCell>
                <div className='w-6 h-6 rounded-full' style={{backgroundColor: article.bg_color}} />
            </TableCell>
            <TableCell>
                <div className="flex items-center justify-center">
                    <ButtonPreview handlePreview={handlePreview} />
                    <ButtonEdit handleUpdate={handleUpdate} />
                    <ButtonDelete handleDelete={handleDelete} />
                 </div>
            </TableCell>
        </TableRow>
    )
}

export default OverviewDiaryItem