import request from "../../utils/request";

const getblogs = async () => {
  const { data } = await request.get("/api/blog/");

  return data;
};

const blogsService = {
  getblogs,
};
export default blogsService;
