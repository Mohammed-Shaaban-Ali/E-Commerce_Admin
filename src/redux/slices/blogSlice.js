import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const getSingleBlog = createAsyncThunk(
  "blog/getSingleBlog",
  async (id, thunkAPI) => {
    try {
      return await blogsService.getSingleBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateblog = createAsyncThunk(
  "blog/updateblog",
  async (brandData, thunkAPI) => {
    try {
      return await blogsService.updateblog(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteblog = createAsyncThunk(
  "blog/deleteblog",
  async (id, thunkAPI) => {
    try {
      return await blogsService.deleteblog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const blogslice = createSlice({
  name: "blogs",
  initialState,
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
      })

      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlebrand = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateblogData = action.payload;
      })
      .addCase(updateblog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteblogData = action.payload;
      })
      .addCase(deleteblog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogslice.reducer;
