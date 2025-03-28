import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProduct";
import Coupon from "@/components/modules/cart/Cupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <ProductBanner title="Cart Page" path="Home - Cart"></ProductBanner>
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        <Coupon />
        <Address />
        <PaymentDetails />
      </div>
    </div>
  );
};

export default CartPage;
