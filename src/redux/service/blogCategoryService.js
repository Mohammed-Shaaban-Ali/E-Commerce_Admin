import request from "../../utils/request";

const getCategory = async () => {
  const { data } = await request.get("/api/brand-category/");

  return data;
};

const blogCategoryService = {
  getCategory,
};
export default blogCategoryService;
