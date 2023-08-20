import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "../service/categoryService";

export const getcategory = createAsyncThunk(
  "Category/getcategory",
  async (thunkAPI) => {
    try {
      return await categoriesService.getcategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSinglecategry = createAsyncThunk(
  "Category/getSinglwcategry",
  async (id, thunkAPI) => {
    try {
      return await categoriesService.getSinglecategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addcategory = createAsyncThunk(
  "Category/addcategory",
  async (category, thunkAPI) => {
    try {
      return await categoriesService.addcategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "Category/updateCategory",
  async (CategoryData, thunkAPI) => {
    try {
      return await categoriesService.updateCategory(CategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "Category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      return await categoriesService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
const categorieslice = createSlice({
  name: "categories",
  initialState,
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
      })

      .addCase(addcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdcategory = action.payload;
      })
      .addCase(addcategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getSinglecategry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglecategry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlecategory = action.payload;
      })
      .addCase(getSinglecategry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateCategoryData = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteCategorydData = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default categorieslice.reducer;
