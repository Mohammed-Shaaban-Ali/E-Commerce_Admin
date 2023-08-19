import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorsService from "../service/colorService";

export const getcolors = createAsyncThunk(
  "color/getcolors",
  async (thunkAPI) => {
    try {
      return await colorsService.getcolors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addcolor = createAsyncThunk(
  "color/addcolor",
  async (color, thunkAPI) => {
    try {
      return await colorsService.addccolor(color);
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
      })

      .addCase(addcolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addcolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdcolor = action.payload;
      })
      .addCase(addcolor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default colorslice.reducer;
