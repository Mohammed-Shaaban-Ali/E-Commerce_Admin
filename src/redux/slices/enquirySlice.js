import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "../service/enquiryService";

export const getenquiries = createAsyncThunk(
  "enquiry/getenquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteEnquiry = createAsyncThunk(
  "enquiry/deleteEnquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getsingleEnquiry = createAsyncThunk(
  "enquiry/getsingleEnquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getsingleEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/updateEnquiry",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
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
      })

      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteenquiryData = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getsingleEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enqName = action.payload.name;
        state.enqMobile = action.payload.mobile;
        state.enqEmail = action.payload.email;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getsingleEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateEnquirydata = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default enquirySlice.reducer;
