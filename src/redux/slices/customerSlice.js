import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "../service/customerService";

export const getUsers = createAsyncThunk("auth/getUsers", async (thunkAPI) => {
  try {
    return await customerService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const resetState = createAction("Reset_all");

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.customers = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default customerSlice.reducer;
