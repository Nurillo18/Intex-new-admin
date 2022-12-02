import { createSlice } from "@reduxjs/toolkit";
import languages from "./localization.js";




const siteProducts = createSlice({
  name: "products",
  initialState: {
    localization: languages,
    lang: "ru",
    search: '',
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    searchProduction: (state, action) => {
      state.search = action.payload
    }
  },
});



export const { changeLang, searchProduction } = siteProducts.actions;

export default siteProducts.reducer;