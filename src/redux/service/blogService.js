import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getblogs = async () => {
  const { data } = await request.get("/api/blog/");
  return data;
};
const addBlogs = async (Blog) => {
  const { data } = await request.post("/api/blog/", Blog, ConfigToken);
  return data;
};

const getSingleBlog = async (id) => {
  const { data } = await request.get(`/api/blog/${id}`, ConfigToken);
  return data;
};

const updateblog = async (blogData) => {
  const { id, Data } = blogData;
  const { data } = await request.put(`/api/blog/${id}`, Data, ConfigToken);
  return data;
};

const deleteblog = async (id) => {
  const { data } = await request.delete(`/api/blog/${id}`, ConfigToken);
  return data;
};
const blogsService = {
  getblogs,
  addBlogs,
  getSingleBlog,
  updateblog,
  deleteblog,
};
export default blogsService;
