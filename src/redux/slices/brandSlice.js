import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandsService from "../service/brandsService";

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
export const getSingleBrand = createAsyncThunk(
  "brand/getSingleBrand",
  async (id, thunkAPI) => {
    try {
      return await brandsService.getSingleBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (brandData, thunkAPI) => {
    try {
      return await brandsService.updateBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, thunkAPI) => {
    try {
      return await brandsService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const brandSlice = createSlice({
  name: "brands",
  initialState,
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
      })

      .addCase(getSingleBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlebrand = action.payload;
      })
      .addCase(getSingleBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateBrandData = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteBrandData = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default brandSlice.reducer;
