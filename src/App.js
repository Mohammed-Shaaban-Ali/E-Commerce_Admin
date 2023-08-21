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
import AddBlog from "./pages/Blogs/AddBlog";
import AddBlogCategory from "./pages/Blogs/AddBlogCategory";
import AddColor from "./pages/Categories/AddColor";
import AddCategory from "./pages/Categories/AddCategory";
import AddBrand from "./pages/Categories/AddBrand";
import AddProduct from "./pages/Categories/AddProduct";
import CouponsList from "./pages/Coupons/CouponsList";
import AddCoupons from "./pages/Coupons/AddCoupons";

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

          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<AddBlog />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="add-blog-category" element={<AddBlogCategory />} />
          <Route path="edit-blog-category/:id" element={<AddBlogCategory />} />
          <Route path="blog-list-category" element={<BlogListCategories />} />

          <Route path="orders" element={<Order />} />

          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<AddCategory />} />
          <Route path="category-list" element={<CategoriesList />} />

          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />

          <Route path="add-brand" element={<AddBrand />} />
          <Route path="edit-brand/:id" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />

          <Route path="add-color" element={<AddColor />} />
          <Route path="edit-color/:id" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />

          <Route path="add-coupon" element={<AddCoupons />} />
          <Route path="edit-coupon/:id" element={<AddCoupons />} />
          <Route path="coupon-list" element={<CouponsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
