import React from 'react'
import DashboardNavbar from '@components/DashboardNavbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen text-akimbo-dark-900 bg-akimbo-light">
      <DashboardNavbar />
      <main className="flex flex-col p-8 mx-auto w-9/12">{children}</main>
    </div>  
  )
}

export default DashboardLayout