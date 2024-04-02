import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <MainLayout>
        <div className='mt-64 flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl md:text-5xl lg:text-7xl underline'>Page not found</h1>
            <p className='text-xl mt-5'>The page you are trying to find doesn't exist.</p>
            <Link
                className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light"
                to={"/"}
            >Return Home</Link>
        </div>
    </MainLayout>
  )
}

export default NotFound