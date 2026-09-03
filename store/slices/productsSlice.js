import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "@/api/products";

export const loadProducts = createAsyncThunk("products/load", async () => {
  return fetchAllProducts({ limit: 100 });
});

const initialState = {
  items: [],
  status: "idle", 
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Could not load products.";
      });
  },
});

export default productsSlice.reducer;

export const selectProductItems = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;

export const selectCategories = (state) => {
  const set = new Set(state.products.items.map((p) => p.category));
  return Array.from(set).sort();
};
