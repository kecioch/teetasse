import { CheckoutState } from "@/types/cart";
import { Address, CustomerInformation } from "@/types/customer";
import { OrderProduct } from "@/types/order";
import { createSlice } from "@reduxjs/toolkit";

export interface CartCheckoutState {
  customerInformation?: CustomerInformation;
  address?: Address;
  clientSecret?: string;
  orderList?: OrderProduct[];
}

const initialState: CartCheckoutState = {};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCustomerInformation(state, action) {
      state.customerInformation = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setCheckoutClientSecret(state, action) {
      state.clientSecret = action.payload;
    },
    setOrderList(state, action) {
      state.orderList = action.payload;
    },
    clearCheckout(state) {
      state.customerInformation = undefined;
      state.address = undefined;
      state.clientSecret = undefined;
      state.orderList = undefined;
    },
    clearClientSecret(state) {
      state.clientSecret = undefined;
    },
  },
});

export const {
  setCustomerInformation,
  setAddress,
  setCheckoutClientSecret,
  setOrderList,
  clearCheckout,
  clearClientSecret,
} = checkoutSlice.actions;
