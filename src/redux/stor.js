import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";
import productSlice from "./slices/productSlice";
import brandSlice from "./slices/brandSlice";

const stor = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerSlice,
    products: productSlice,
    brands: brandSlice,
  },
});

export default stor;
