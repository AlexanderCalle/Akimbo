import React, { useEffect, useState } from 'react'
import { GetPlannedArticles } from '../../services/Articles';
import toast from 'react-hot-toast';
import Loader from '../ui/Loader';
import Table from '../ui/TableComponent/Table';
import TableHead from '../ui/TableComponent/TableHead';
import TableHeadItem from '../ui/TableComponent/TableHeadItem';
import TableBody from '../ui/TableComponent/TableBody';
import PlannedArticle from './PlannedArticle';
import TableCell from '../ui/TableComponent/TableCell';
import TableRow from '../ui/TableComponent/TableRow';

const PlannedArticles = () => {

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      GetPlannedArticles()
        .then(data => {
          setArticles(data);
          setIsLoading(false);
      }).catch(err => {
          console.error(err)
          toast.error(`Something went wrong while loading articles`);
          setIsLoading(false);
      });
        
    }
  
    fetchData();
    return () => {
      setIsLoading(false);
    } 
  }, [])

  if(isLoading) return <Loader />

  return (
    <div>
      <div className='w-full flex justify-between mb-5'>
        <h2 className="text-2xl self-center lg:self-start font-medium underline">Planned Articles</h2>
      </div>
      <div className='mb-5'>
        <Table>
          <TableHead>
            <TableHeadItem name="Title" isSortable />
            <TableHeadItem name="Author" isSortable />
            <TableHeadItem name="Category" isSortable />
            <TableHeadItem name="Start date" isSortable />
            <TableHeadItem name="Publish" />
          </TableHead>
          <TableBody>
            {articles.length > 0 ? (
              <>
              {articles.map((article, idx) => (
                <PlannedArticle
                  key={idx}
                  article={article}
                />
              ))
              }
            </>
            ) : (
              <TableRow>
                <TableCell>
                    <p className=''>No articles available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PlannedArticles