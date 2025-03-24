import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types/product";
import React from "react";
import FilterSidebar from "./SidebarFilter";

const AllProducts = ({ products }: { products: IProduct[]}) => {
  return (
    <div className="flex mt-10 gap-8">
      <div>
        <FilterSidebar />
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1"> 
        {products?.map((product: IProduct, idx: number) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
