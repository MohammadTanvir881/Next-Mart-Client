"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="p-2">
      <CardHeader className="relative h-40 p-0">
        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={500}
          height={500}
          alt="product image"
          className="rounded-sm h-40 object-cover w-full"
        />
        {product?.stock === 0 && (
          <div className="absolute left-2 top-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      <CardContent className="p-2">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="font-semibold text-sm leading-tight cursor-pointer"
          >
            {product?.name.length > 30
              ? product?.name?.slice(0, 30) + "..."
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600">
            {product?.offerPrice ? (
              <>
                <span className="font-semibold text-orange-400">
                  $ {product?.offerPrice.toFixed(2)}
                </span>
                <del className="text-xs ml-2">$ {product?.price.toFixed(2)}</del>
              </>
            ) : (
              <span className="font-semibold">$ {product?.price.toFixed(2)}</span>
            )}
          </p>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" fill="orange" stroke="orange" />
            <span className="text-sm font-medium text-gray-700">
              {product?.averageRating}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2">
        <div className="flex gap-2 items-center justify-between w-full">
          <Button
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            Buy Now
          </Button>
          <Button
            disabled={product?.stock === 0}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <ShoppingCart />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
