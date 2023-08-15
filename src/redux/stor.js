import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";
import productSlice from "./slices/productSlice";
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";
import colorSlice from "./slices/colorSlice";
import blogSlice from "./slices/blogSlice";
import blogCategorySlice from "./slices/blogCategorySlice";

const stor = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerSlice,
    products: productSlice,
    brands: brandSlice,
    productCategory: categorySlice,
    colors: colorSlice,
    blogs: blogSlice,
    blogCategory: blogCategorySlice,
  },
});

export default stor;
