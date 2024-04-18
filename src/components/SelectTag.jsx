import React, { useState } from 'react'

const SelectTag = ({handleChange, tags}) => {

  const [showBox, setShowBox] = useState(false) 

  const handleOption = (e) => {
    setShowBox(false);
    handleChange(e.target.value)
  }

  return (
    <div class="dropdown">
      <button className="w-32 max-h-24 overflow-scroll bg-akimbo-light px-3 py-2 text-md border-2 border-akimbo-dark-900 focus:ring-akimbo-dark-500 focus:border-akimbo-dark-500 cursor-pointer" type="button" id="menu1" onClick={() => setShowBox(!showBox)}>
        Filter by tags
        <span class="caret">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <ul className={`absolute w-[160px] bg-akimbo-light z-20 dropdown-menu border p-2 ${showBox ? "visible" : "hidden"}`} role="menu">
      <button className='w-full text-left p-1 hover:bg-opacity-5 hover:bg-[#4A4A4A30] ' onClick={handleOption} value="">-- See all --</button>
      {tags.map((tag, idx) => (
          <button className='w-full text-left p-1 hover:bg-opacity-5 hover:bg-[#4A4A4A30] ' onClick={handleOption} key={idx} value={tag.name}>{tag.name}</button>
        ))}
      </ul>
    </div>
  )
}

export default SelectTag