import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
