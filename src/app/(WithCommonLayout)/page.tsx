"use client";
import { useUser } from '@/providers/Providers'
import React from 'react'

const HomePage = () => {
  const user = useUser()
  console.log(user)
  return (
    <div className='container mx-auto'>
     <h1>Wellcome To Next Mart Home Page</h1>
    </div>
  )
}

export default HomePage