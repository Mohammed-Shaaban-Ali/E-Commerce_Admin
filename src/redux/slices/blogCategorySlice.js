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
export const getSingleBlogCategory = createAsyncThunk(
  "blogCategory/getSingleBlogCategory",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.getSingleBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlogCategory = createAsyncThunk(
  "blogCategory/updateBlogCategory",
  async (blogCategoryData, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(blogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlogCategory = createAsyncThunk(
  "blogCategory/deleteBlogCategory",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(id);
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

      .addCase(getSingleBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleblogCategorydata = action.payload;
      })
      .addCase(getSingleBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateBLogCategorydData = action.payload;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteBlogCategoryData = action.payload;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogCategorylice.reducer;
