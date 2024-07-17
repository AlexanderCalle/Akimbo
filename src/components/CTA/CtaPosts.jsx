import React, { useEffect, useState } from 'react'
import Loader from '../ui/Loader';
import { GetActiveCta } from '../../services/CTA';
import toast from 'react-hot-toast';
import CtaPost from './CtaPost';

const CtaPosts = () => {

  const [ctaList, setCtaList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GetActiveCta();
        setCtaList(data);
      } catch (error) {
        toast.error("unexpected error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if(loading) return (<Loader />)

  if(ctaList.length < 1) return;

  return (
    <div className='w-full md:w-10/12 m-auto'>
      <div className="flex flex-col gap-4">
        
        {ctaList.map(cta => (
          <CtaPost key={cta.id} {...cta} /> 
        ))}
      </div>
    </div>
  )
}

export default CtaPosts