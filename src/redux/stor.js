import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";
import productSlice from "./slices/productSlice";
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";
import colorSlice from "./slices/colorSlice";
import blogSlice from "./slices/blogSlice";
import blogCategorySlice from "./slices/blogCategorySlice";
import enquirySlice from "./slices/enquirySlice";
import uploadSlice from "./slices/uploadSlice";

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
    enquiries: enquirySlice,
    upload: uploadSlice,
  },
});

export default stor;
