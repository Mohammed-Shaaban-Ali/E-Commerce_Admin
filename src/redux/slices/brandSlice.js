import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandsService from "../service/brandsService";

export const getbrands = createAsyncThunk(
  "brand/getbrands",
  async (thunkAPI) => {
    try {
      return await brandsService.getbrand();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (brand, thunkAPI) => {
    try {
      return await brandsService.addBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getbrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getbrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getbrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        state.brands = [];
      })

      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdbrand = action.payload;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default brandSlice.reducer;
