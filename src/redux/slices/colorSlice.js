import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorsService from "../service/colorService";

export const getcolors = createAsyncThunk(
  "auth/getcolors",
  async (thunkAPI) => {
    try {
      return await colorsService.getcolors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const colorslice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcolors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcolors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getcolors.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = action.error;
      });
  },
});
export default colorslice.reducer;
