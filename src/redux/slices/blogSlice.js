import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogsService from "../service/blogService";

export const getblogs = createAsyncThunk("auth/getblogs", async (thunkAPI) => {
  try {
    return await blogsService.getblogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
      });
  },
});
export default blogslice.reducer;
