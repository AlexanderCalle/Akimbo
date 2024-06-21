import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetById } from '../../../services/CTA';
import toast from 'react-hot-toast';
import Loader from '../../../components/ui/Loader';
import CtaForm from '../../../components/CTA/CtaForm';

const UpdateCtaPage = () => {

  const { id } = useParams();

  const [cta, setCta] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const user = await GetById(id);
        setCta(user);
      } catch (error) {
        toast.error('Something went wrong while fetching CTA');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id])

  if(loading) return <Loader />

  return (
    <div>
      <CtaForm {...cta} id={id} />
    </div>
  )
}

export default UpdateCtaPage