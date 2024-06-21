import React from 'react'

const CtaPost = ({title, description, backgroundColor, image}) => {
  return (
    <div className='flex'>
      {image && <img src={image} alt={title} className='max-h-60 object-cover aspect-square' />}
      <div style={{backgroundColor: backgroundColor+"20"}} className='flex-1 px-5 py-3 flex flex-col gap-2 items-start justify-center'>
        <h3 className='font-semibold text-lg  '>{title}</h3>
        <p className='flex-1'>{description}</p>
      </div>
    </div>
  )
}

export default CtaPost