import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getcolors = createAsyncThunk(
  "auth/getcolors",
  async (thunkAPI) => {
    try {
      return await colorsService.getcategory();
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
      .addCase(getcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getcategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = action.error;
      });
  },
});
export default colorslice.reducer;
