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
    deleteProduct(state, action) {
      const index = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      if (index >= -1) {
        const newProducts = state.products;
        newProducts.splice(index, 1);
        state.products = newProducts;
        state.cartCounter--;
      }
    },
    changeQty(state, action) {
      const { id, qty } = action.payload;

      const index = state.products.findIndex((el) => el.id === id);
      if (index >= 0 && qty <= state.products[index].stock) {
        state.products[index].qty = qty;
      }
    },
  },
});

export const { addProduct, deleteProduct, changeQty } = cartSlice.actions;
