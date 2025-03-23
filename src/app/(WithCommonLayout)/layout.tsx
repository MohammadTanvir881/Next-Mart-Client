import Footer from '@/components/Shared/Footer'
import Navbar from '@/components/Shared/Navbar'
import React, { ReactNode } from 'react'

const CommonLayout = ({children} : {children : ReactNode}) => {
  return (
    <div className='container mx-auto'>
        <Navbar></Navbar>
        <div className='min-h-screen'>
        {children}
        </div>
        <Footer></Footer>
    </div>
  )
}

export default CommonLayout