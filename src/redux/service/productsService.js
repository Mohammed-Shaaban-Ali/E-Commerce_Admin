import request from "../../utils/request";

const getProducts = async () => {
  const { data } = await request.get("/api/product/");

  return data;
};

const productsService = {
  getProducts,
};
export default productsService;
