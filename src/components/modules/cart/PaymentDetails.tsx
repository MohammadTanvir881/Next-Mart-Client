"use client";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useUser } from "@/providers/Providers";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/cart";
import { IOrder } from "@/types/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const subtotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const order = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const { user } = useUser();
  const router = useRouter();
  console.log(user);

  const handleOrder = async () => {
    const orderLoading = toast.loading("Placing Order");
    try {
      if (!user) {
        router.push("/login");
        throw new Error("Please login to place order");
      }
      if (!city || !shippingAddress) {
        throw new Error("Please fill up the address");
      }
      if (cartProducts.length === 0) {
        throw new Error("Please add some products to cart");
      }

      const res = await createOrder(order as IOrder);
      if (res.success) {
        toast.success("Order Placed Successfully", { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.paymentUrl);
      }

      if(!res.success) {
        throw new Error(res.message);
      }

      console.log(order);
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };
  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">{currencyFormatter(0)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
};

export default PaymentDetails;
