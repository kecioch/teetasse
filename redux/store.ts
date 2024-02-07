import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./features/modalSlice";
import { cartSlice } from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
