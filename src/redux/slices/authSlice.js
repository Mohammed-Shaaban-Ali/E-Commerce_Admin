import { toast } from "react-toastify";

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/authService";

const getUserFromLocalStorge = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrders = createAsyncThunk(
  "users/getOrders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthWiseOrderIncom = createAsyncThunk(
  "orders/getMonthWiseOrderIncom",
  async (thunkAPI) => {
    try {
      return await authService.getMonthWiseOrderIncom();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearsTotalOrders = createAsyncThunk(
  "orders/getYearsTotalOrders",
  async (thunkAPI) => {
    try {
      return await authService.getYearsTotalOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleOrder = createAsyncThunk(
  "users/getSingleOrder",
  async (id, thunkAPI) => {
    try {
      return await authService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "users/updateOrder",
  async (Date, thunkAPI) => {
    try {
      return await authService.updateOrder(Date);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  user: getUserFromLocalStorge,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(getMonthWiseOrderIncom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthWiseOrderIncom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getOrderIncom = action.payload;
        state.message = "success";
      })
      .addCase(getMonthWiseOrderIncom.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getYearsTotalOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearsTotalOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getYearsOrders = action.payload;
        state.message = "success";
      })
      .addCase(getYearsTotalOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleorder = action.payload;
        state.message = "success";
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateorder = action.payload;
        if (state.isSuccess && state.updateorder) {
          toast.success("Status updated successfully");
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});
export default authSlice.reducer;
