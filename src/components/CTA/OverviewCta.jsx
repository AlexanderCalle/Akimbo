import React, { useEffect, useState } from 'react'
import { DeleteCta, GetAll } from '../../services/CTA';
import Loader from '../ui/Loader'
import toast from 'react-hot-toast';
import Table from '../ui/TableComponent/Table';
import TableHead from '../ui/TableComponent/TableHead';
import TableHeadItem from '../ui/TableComponent/TableHeadItem';
import TableBody from '../ui/TableComponent/TableBody';
import CtaItem from './CtaItem';
import { Link } from 'react-router-dom';
import ModalDelete from '../ModalDelete';

const OverviewCta = () => {

  const [ctaList, setCtaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ctaToDelete, setCtaToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GetAll();
        setCtaList(data);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete() {
    DeleteCta(ctaToDelete.id)
      .then((result) => {
        const newArticles = ctaList.filter(
          (cta) => cta.id !== ctaToDelete.id
        );
        setCtaList(newArticles);
        setShowModal(false);
        toast.success("Article deleted");
      })
      .catch((err) => {
        toast.error("Error: something went wrong deleting article");
        console.log(err);
      });
  }

  const onDelete = (article) => {
    setCtaToDelete(article)
    setShowModal(true);
  }

  if(loading) return (<Loader />)

  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h2 className="text-2xl self-center lg:self-start font-medium underline">
          Overview CTA
        </h2>
        <Link to="/dashboard/cta/create" className='px-3 py-1 bg-akimbo-dark-900 text-akimbo-light hover:bg-akimbo-dark-500'>
          Create CTA
        </Link>
      </div>
      <div className="mb-5">
        <Table>
          <TableHead>
            <TableHeadItem name="Title" isSortable />
            <TableHeadItem name="Description" isSortable />
            <TableHeadItem name="Start date" isSortable />
            <TableHeadItem name="End date" isSortable />
            <TableHeadItem name="Actions" />
          </TableHead>
          <TableBody>
            {ctaList.length > 0 ? 
              ctaList.map((cta, index) => (
                <CtaItem key={index} cta={cta} onDelete={onDelete} />
              )) : 
              (<tr><td colSpan="4">No data</td></tr>)}
          </TableBody>
        </Table>
        {showModal && (
          <ModalDelete name="CTA" setShowModal={setShowModal} handleDelete={handleDelete}>
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
              Are you sure you want to delete {ctaToDelete.title}?
            </p>
          </ModalDelete>
        )}
      </div>
    </div>
  )
}

export default OverviewCta