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

const blogsService = {
  getblogs,
  addBlogs,
};
export default blogsService;
