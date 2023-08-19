import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogsService from "../service/blogService";

export const getblogs = createAsyncThunk("blogs/getblogs", async (thunkAPI) => {
  try {
    return await blogsService.getblogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addBlogs = createAsyncThunk(
  "blogs/addcategory",
  async (blogs, thunkAPI) => {
    try {
      return await blogsService.addBlogs(blogs);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogslice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getblogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getblogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = action.error;
      })

      .addCase(addBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
      })
      .addCase(addBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default blogslice.reducer;
