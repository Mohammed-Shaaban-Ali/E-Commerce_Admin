import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoryService from "../service/blogCategoryService";

export const getblogCategory = createAsyncThunk(
  "auth/getblogCategory",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogCategorylice = createSlice({
  name: "blogCategory",
  initialState: {
    blogCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getblogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategory = action.payload;
      })
      .addCase(getblogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategory = action.error;
      });
  },
});
export default blogCategorylice.reducer;
