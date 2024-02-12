import { CheckoutState } from "@/types/cart";
import { Address, CustomerInformation } from "@/types/customer";
import { createSlice } from "@reduxjs/toolkit";

export interface CartCheckoutState {
  state: CheckoutState;
  userId?: number;
  customerInformation?: CustomerInformation;
  address?: Address;
}

const initialState: CartCheckoutState = {
  state: CheckoutState.CUSTOMER_DATA,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setState(state, action) {
      state.state = action.payload;
    },
  },
});

export const { setState } = checkoutSlice.actions;
