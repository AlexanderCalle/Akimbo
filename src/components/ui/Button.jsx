import React from 'react'

const Button = ({handleClick, children}) => {
  return (
    <button 
      className='bg-akimbo-dark-900 px-3 py-1 text-akimbo-light hover:bg-akimbo-dark-500'
      onClick={handleClick}
    >
        {children}
    </button>
  )
}

export default Button