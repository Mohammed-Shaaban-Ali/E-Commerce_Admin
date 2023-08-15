import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";

const stor = configureStore({
  reducer: { auth: authReducer, customers: customerSlice },
});

export default stor;
