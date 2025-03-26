export interface IOrder {
  products: IOrderProduct[];
  city: string;
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  color: string;
}
