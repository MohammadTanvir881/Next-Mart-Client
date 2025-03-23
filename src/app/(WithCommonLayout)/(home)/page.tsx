
import Category from '@/components/modules/home/category';
import CategorySection from '@/components/modules/home/category';
import FeaturedProducts from '@/components/modules/home/FeaturedProducts';
import HeroSection from '@/components/modules/home/HeroSection/HeroSection';
import React from 'react'

const HomePage = () => {
  return (
    <div className='container mx-auto space-y-4'>
      <HeroSection></HeroSection>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
    </div>
  )
}

export default HomePage