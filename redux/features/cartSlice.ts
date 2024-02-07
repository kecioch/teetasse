import { CartProduct } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  products: CartProduct[];
  cartCounter: number;
}

const initialState: CartState = {
  products: [],
  cartCounter: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const cartProduct: CartProduct = { ...action.payload };
      console.log("REDUCER ADDPRODUCT", cartProduct);

      const index = state.products.findIndex((el) => el.id === cartProduct.id);
      if (index >= 0) {
        const newQty = state.products[index].qty + cartProduct.qty;
        if (newQty <= state.products[index].stock)
          state.products[index].qty = newQty;
      } else {
        state.products.push(cartProduct);
        state.cartCounter++;
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
