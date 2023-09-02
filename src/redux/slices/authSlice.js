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
export const getOrderbyid = createAsyncThunk(
  "users/getOrderbyid",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrders(id);
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

      .addCase(getOrderbyid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderbyid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ordersbyid = action.payload;
        state.message = "success";
      })
      .addCase(getOrderbyid.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});
export default authSlice.reducer;
