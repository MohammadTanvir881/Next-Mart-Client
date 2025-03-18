import CreateBrandModal from '@/components/modules/shop/Brand/CreateBrandModal'
import React from 'react'

const ManageBrandPage = () => {
  return (
    <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Create Brand </h1>
        <CreateBrandModal></CreateBrandModal>
    </div>
  )
}

export default ManageBrandPage