import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getCategory = async () => {
  const { data } = await request.get("/api/blog-category/");
  return data;
};
const addBlogcategory = async (Blogcategory) => {
  const { data } = await request.post(
    "/api/blog-category/",
    Blogcategory,
    ConfigToken
  );
  return data;
};

const getSingleBlogCategory = async (id) => {
  const { data } = await request.get(`/api/blog-category/${id}`, ConfigToken);
  return data.title;
};

const updateBlogCategory = async (BlogCategoryData) => {
  const { id, Data } = BlogCategoryData;
  const { data } = await request.put(
    `/api/blog-category/${id}`,
    Data,
    ConfigToken
  );
  return data;
};

const deleteBlogCategory = async (id) => {
  const { data } = await request.delete(
    `/api/blog-category/${id}`,
    ConfigToken
  );
  return data;
};

const blogCategoryService = {
  getCategory,
  addBlogcategory,
  getSingleBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
export default blogCategoryService;
