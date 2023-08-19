import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getcategory = async () => {
  const { data } = await request.get("/api/product-category/");
  return data;
};

const addcategory = async (category) => {
  const { data } = await request.post(
    "/api/product-category/",
    category,
    ConfigToken
  );
  return data;
};
const categoriesService = {
  getcategory,
  addcategory,
};
export default categoriesService;
