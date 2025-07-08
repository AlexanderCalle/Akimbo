import React, { useEffect, useState } from 'react'
import { getAllContributers } from '../../services/contributers';
import { PiSpinnerGap } from "react-icons/pi";

export const ContributersList = () => {

  const [contributers, setContributers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await getAllContributers()
        setContributers(data);
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  
  if(loading) return (
      <PiSpinnerGap className='animate-spin size-5' />
  )

  return (
    <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2'>
      {contributers !== undefined && contributers.map((contributer) => (
        <div className='flex flex-col gap-0'>
          {contributer.link ? (
            <a href={contributer.link} target='__blank' className='hover:underline'>
              <h4 className='font-medium text-medium'>{contributer.name}</h4>
            </a>
          ): (
            <h4 className='font-medium text-medium'>{contributer.name}</h4>
          )}
         {contributer.description && (<p>{contributer.description}</p>)}
        </div>
      ))}
    </div>
  )
}