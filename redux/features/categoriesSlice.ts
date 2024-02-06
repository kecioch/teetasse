import { Category } from "@/types/category";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
