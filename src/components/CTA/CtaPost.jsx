'use client'

const CtaPost = ({title, description, backgroundColor, image}) => {
  return (
    <div className='flex'>
      {image && <img src={image} alt={title} className='object-cover max-h-60 aspect-square' />}
      <div style={{backgroundColor: backgroundColor+"20"}} className='flex flex-col flex-1 gap-2 justify-center items-start px-5 py-3'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='flex-1'>{description}</p>
      </div>
    </div>
  )
}

export default CtaPost