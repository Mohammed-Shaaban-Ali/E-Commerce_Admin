import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./MainLayout.css";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineShoppingCart,
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";

import { Layout, Menu, Button, theme } from "antd";
import { Content } from "antd/es/layout/layout";

import adminPhoto from "../../image/admin.jpg";
const { Header, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 ">
            <span className="sm-logo">MSH</span>
            <span className="lg-logo">Mo.Shaaban</span>
          </h2>
        </div>

        <Menu
          onClick={({ key }) => {
            if (key === "singout") {
            } else {
              navigate(key);
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customes",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customes",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "add-brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "add-category",
                  icon: <BiCategoryAlt className="fs-5" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "add-color",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "add-blog-category",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-list-category",
                  icon: <FaBloggerB className="fs-5" />,
                  label: "Blog List Category",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between ps-3 pe-4"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-3" />
              <span
                style={{ margin: "16px -7px" }}
                className="position-absolute badge bg-warning p-1 rounded-circle"
              >
                3
              </span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="adminPhoto">
                <img className="img-fluid" src={adminPhoto} alt="adminPhoto" />
              </div>
              <div className="info">
                <h5 className="text-dark mb-0">Mohamed</h5>
                <p className="mb-0">ms7500746@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 240,
            // backgroundColor: ,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
