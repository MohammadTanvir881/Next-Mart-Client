import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types/product";
import Link from "next/link";
import CountdownTimer from "./CountDown";
import CountDown from "./CountDown";

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Flash Sale</h2>
          <CountDown></CountDown>
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 my-5">
          {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
