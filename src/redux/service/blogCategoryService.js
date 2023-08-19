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
const blogCategoryService = {
  getCategory,
  addBlogcategory,
};
export default blogCategoryService;
