import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getbrand = async () => {
  const { data } = await request.get("/api/brand-category/");
  return data;
};

const addBrand = async (brand) => {
  const { data } = await request.post(
    "/api/brand-category/",
    brand,
    ConfigToken
  );
  return data;
};
const brandsService = {
  getbrand,
  addBrand,
};
export default brandsService;
