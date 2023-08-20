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
const getSinglecategory = async (id) => {
  const { data } = await request.get(
    `/api/product-category/${id}`,
    ConfigToken
  );
  return data.title;
};
const updateCategory = async (CategoryData) => {
  const { id, Data } = CategoryData;
  const { data } = await request.put(
    `/api/product-category/${id}`,
    Data,
    ConfigToken
  );
  return data;
};

const deleteCategory = async (id) => {
  const { data } = await request.delete(
    `/api/product-category/${id}`,
    ConfigToken
  );
  return data;
};
const categoriesService = {
  getcategory,
  addcategory,
  getSinglecategory,
  updateCategory,
  deleteCategory,
};
export default categoriesService;
