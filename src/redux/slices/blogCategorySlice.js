import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoryService from "../service/blogCategoryService";

export const getblogCategory = createAsyncThunk(
  "Blogcategory/getblogCategory",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addBlogcategory = createAsyncThunk(
  "Blogcategory/addcategory",
  async (category, thunkAPI) => {
    try {
      return await blogCategoryService.addBlogcategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  blogCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const blogCategorylice = createSlice({
  name: "blogCategory",
  initialState,
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
      })

      .addCase(addBlogcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlogcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBlogcategory = action.payload;
      })
      .addCase(addBlogcategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogCategorylice.reducer;
