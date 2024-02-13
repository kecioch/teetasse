import { CheckoutState } from "@/types/cart";
import { Address, CustomerInformation } from "@/types/customer";
import { createSlice } from "@reduxjs/toolkit";

export interface CartCheckoutState {
  customerInformation?: CustomerInformation;
  address?: Address;
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
    clearCheckout(state) {
      state.customerInformation = undefined;
      state.address = undefined;
    },
  },
});

export const { setCustomerInformation, setAddress, clearCheckout } =
  checkoutSlice.actions;
