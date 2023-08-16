import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "../service/enquiryService";

export const getenquiries = createAsyncThunk(
  "auth/getenquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getenquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getenquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getenquiries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = action.error;
      });
  },
});
export default enquirySlice.reducer;
