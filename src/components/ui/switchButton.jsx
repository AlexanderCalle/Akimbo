import React from 'react'
import './switch.css'

const SwitchButton = ({value, setValue, name}) => {
  return (
    <>
      <label htmlFor="is_published">{name}</label>
      <label className="switch">
        <input 
          id="is_published" 
          type="checkbox" 
          onChange={(e) => setValue(e.target.checked)} 
          checked={value}
        />
        <span className="slider"></span>
      </label>
      </>
  )
}

export default SwitchButton