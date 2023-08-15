import request from "../../utils/request";

const getcategory = async () => {
  const { data } = await request.get("/api/product-category/");
  return data;
};

const categoriesService = {
  getcategory,
};
export default categoriesService;
