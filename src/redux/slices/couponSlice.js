import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "../service/couponService";

export const getCuopons = createAsyncThunk(
  "coupons/getCuopons",
  async (thunkAPI) => {
    try {
      return await couponService.getCuopons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCuopons = createAsyncThunk(
  "coupons/addCuopons",
  async (copuons, thunkAPI) => {
    try {
      return await couponService.addCuopons(copuons);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSinglecoupon = createAsyncThunk(
  "coupon/getSinglecoupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getSingleCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatecoupon = createAsyncThunk(
  "coupon/updatecoupon",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.updateCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletecoupon = createAsyncThunk(
  "coupon/deletecoupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCuopons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCuopons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCuopons.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = action.error;
      })

      .addCase(addCuopons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCuopons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdcoupon = action.payload;
      })
      .addCase(addCuopons.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getSinglecoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglecoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponDiscount = action.payload.discount;
        state.couponExpiry = action.payload.expiry;
      })
      .addCase(getSinglecoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updatecoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatecoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateCouponData = action.payload;
      })
      .addCase(updatecoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deletecoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletecoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteCouponData = action.payload;
      })
      .addCase(deletecoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default couponSlice.reducer;
