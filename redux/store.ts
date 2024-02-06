import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./features/modalSlice";
import { categoriesSlice } from "./features/categoriesSlice";

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
