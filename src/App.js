import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Forms/Login";
import ResetPassword from "./pages/Forms/ResetPassword";
import ForgetPassword from "./pages/Forms/ForgetPassword";
import MainLayout from "./pages/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customes from "./pages/Customes/Customes";
import Enquiries from "./pages/Enquiries/Enquiries";
import BlogList from "./pages/Blogs/BlogList";
import BlogListCategories from "./pages/Blogs/BlogListCategories";
import Order from "./pages/Order/Order";
import CategoriesList from "./pages/Categories/CategoriesList";
import ColorList from "./pages/Categories/ColorList";
import BrandList from "./pages/Categories/BrandList";
import ProductList from "./pages/Categories/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/rorget-password" element={<ForgetPassword />} />

        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customes" element={<Customes />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-list-category" element={<BlogListCategories />} />
          <Route path="orders" element={<Order />} />
          <Route path="category-list" element={<CategoriesList />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="color-list" element={<ColorList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
