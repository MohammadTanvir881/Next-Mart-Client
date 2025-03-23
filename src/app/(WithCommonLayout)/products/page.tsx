import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import React from "react";

const AllProductPage = async () => {
  const { data: categories } = await getAllCategories();
  return (
    <div>
      <ProductBanner title="All Product" path="Home - Products"></ProductBanner>
      <h2 className="text-xl font-bold  mt-5">Featured Collection</h2>
      <div className="grid grid-cols-6 gap-6 mt-4">
        {categories.slice(0, 6)?.map((category: ICategory, index: number) => (
          <CategoryCard key={index} category={category}></CategoryCard>
        ))}
      </div>
      <AllProducts></AllProducts>
    </div>
  );
};

export default AllProductPage;
