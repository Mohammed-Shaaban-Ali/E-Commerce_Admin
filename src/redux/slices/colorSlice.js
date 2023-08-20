import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const getSinglecolor = createAsyncThunk(
  "color/getSinglecolor",
  async (id, thunkAPI) => {
    try {
      return await colorsService.getSingleColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatecolor = createAsyncThunk(
  "color/updatecolor",
  async (colorData, thunkAPI) => {
    try {
      return await colorsService.updateColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletecolor = createAsyncThunk(
  "color/deletecolor",
  async (id, thunkAPI) => {
    try {
      return await colorsService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const colorslice = createSlice({
  name: "colors",
  initialState,
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
      })

      .addCase(getSinglecolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglecolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlecolor = action.payload;
      })
      .addCase(getSinglecolor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updatecolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatecolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateColorData = action.payload;
      })
      .addCase(updatecolor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deletecolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletecolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletecolorData = action.payload;
      })
      .addCase(deletecolor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorslice.reducer;
