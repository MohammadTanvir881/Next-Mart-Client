import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface cartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: cartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );
      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

//? product

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

//? payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.orderQuantity * product.offerPrice;
    } else {
      return acc + product.orderQuantity * product.price;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  return subTotalSelector(state) + shippingCostSelector(state);
};

//? address

export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
