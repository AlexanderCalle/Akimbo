import React from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen text-akimbo-dark-900">
      <div className="fixed top-0 z-20 w-full bg-opacity-80 h-fit bg-akimbo-light">
        <Navbar />
      </div>
      <main className="flex flex-col flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout