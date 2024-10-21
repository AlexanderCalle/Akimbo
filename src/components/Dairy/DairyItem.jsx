import React from 'react'

const DiaryItem = ({item}) => {

  return (
    <a
        href={`/diary/${item.id}`}
        className={`h-fit relative flex flex-col gap-2 mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 break-inside-avoid-column group`}
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
            <h3 className='font-bold group-hover:underline text-lg'>{item.title}</h3>
            {item.description !== "" && <p>{item.description}</p>}
            {item.author !== "" && <p className='text-sm font-light'>{item.author}</p>}
        </div>
    </a>
  )
}

export default DiaryItem