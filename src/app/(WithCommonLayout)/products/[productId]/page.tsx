import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/Product";
import React from "react";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);

  return (
    <div>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      ></ProductBanner>
      <div className="my-10">
        <ProductDetails product={product}></ProductDetails>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
