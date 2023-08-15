import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";
import productSlice from "./slices/productSlice";

const stor = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerSlice,
    products: productSlice,
  },
});

export default stor;
