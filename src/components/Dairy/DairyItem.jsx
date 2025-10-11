import React from 'react'

const DiaryItem = ({item}) => {

  return (
    <a
        href={`/diary/${item.slug}`}
        className={`flex relative flex-col gap-2 mb-4 h-fit before:content-[''] before:rounded-md before:absolute before:inset-0 break-inside-avoid-column group`}
        style={{backgroundColor: item.bg_color}}
    >
        {item.image !== "" &&  (
            <div>
                <img
                    src={item.image}
                    alt="item"
                    className="object-cover w-full h-56"
                />
            </div>
        )}
        <div className={`p-2  ${
            item.isInvert && "[&_*:not(image)]:invert"
        }`}>
            <h3 className='text-lg font-bold group-hover:underline'>{item.title}</h3>
            {item.description !== "" && <p>{item.description}</p>}
            {item.author !== "" && <p className='text-sm font-light'>{item.author}</p>}
        </div>
    </a>
  )
}

export default DiaryItem