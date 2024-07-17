import React from 'react'

const Button = ({handleClick, children, ...rest}) => {
  return (
    <button 
      className='bg-akimbo-dark-900 px-3 py-1 text-akimbo-light hover:bg-akimbo-dark-500'
      onClick={handleClick}
      {...rest}
    >
        {children}
    </button>
  )
}

export default Button