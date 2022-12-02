import { createSlice } from "@reduxjs/toolkit";

const siteProducts = createSlice({
  name: "products",
  initialState: {
    data: [],
    image: {}
  },
  reducers: {
  getProducts: (state, action) => {
    state.data = action.payload
  },
  getImage: (state, action) => {
    state.image = action.payload
  }
  },
});

export const { getProducts, getImage } = siteProducts.actions;

export default siteProducts.reducer;
