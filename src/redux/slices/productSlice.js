import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "../service/productsService";

export const getProducts = createAsyncThunk(
  "auth/getProducts",
  async (thunkAPI) => {
    try {
      return await productsService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.products = action.error;
      });
  },
});
export default productSlice.reducer;
