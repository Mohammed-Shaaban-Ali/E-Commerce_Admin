import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const stor = configureStore({
  reducer: { auth: authReducer },
});

export default stor;
