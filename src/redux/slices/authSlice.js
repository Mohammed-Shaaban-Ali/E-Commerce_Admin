import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/authService";

const userD = {
  _id: null,
  firstname: null,
  lastname: null,
  email: null,
  mobil: null,
  token: null,
};

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userD,
    isError: false,
    isLoading: false,
    isSuccess: false,
    masege: "",
  },
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
        state.user = null;
      });
  },
});
export default authSlice.reducer;
