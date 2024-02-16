import React from 'react'

const DairyItem = ({item}) => {

  return (
    <a
        href={`/dairy/${item.id}`}
        className={`h-fit relative flex flex-col gap-2 mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 break-inside-avoid-column`}
        style={{backgroundColor: item.bg_color}}
    >
        {item.image !== "" &&  (
            <div>
                <img
                    src={item.image}
                    alt="item"
                    className="w-full h-56 object-cover"
                />
            </div>
        )}
        <div className={`p-2  ${
            item.isInvert && "[&_*:not(image)]:invert"
        }`}>
            <h3 className='font-bold underline text-xl'>{item.title}</h3>
            {item.description !== "" && <p>{item.description}</p>}
            {item.author !== "" && <p className='text-sm font-light'>{item.author}</p>}
        </div>
    </a>
  )
}

export default DairyItem