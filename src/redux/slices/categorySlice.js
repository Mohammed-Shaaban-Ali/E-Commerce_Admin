import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "../service/categoryService";

export const getcategory = createAsyncThunk(
  "auth/getcategory",
  async (thunkAPI) => {
    try {
      return await categoriesService.getcategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorieslice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
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
        state.categories = action.payload;
      })
      .addCase(getcategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.categories = action.error;
      });
  },
});
export default categorieslice.reducer;
