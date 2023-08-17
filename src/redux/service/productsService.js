import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getProducts = async () => {
  const { data } = await request.get("/api/product/");
  return data;
};
const addProduct = async (product) => {
  const { data } = await request.post("/api/product/", product, ConfigToken);
  return data;
};

const productsService = {
  getProducts,
  addProduct,
};
export default productsService;
