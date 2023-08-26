import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "../service/productsService";

export const getProducts = createAsyncThunk(
  "getProducts/Products",
  async (thunkAPI) => {
    try {
      return await productsService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addProduct = createAsyncThunk(
  "addProduct/Products",
  async (product, thunkAPI) => {
    try {
      return await productsService.addProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productsService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
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
        state.message = action.error;
      })

      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteproduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
