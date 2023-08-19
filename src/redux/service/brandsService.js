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

const getSingleBrand = async (id) => {
  const { data } = await request.get(`/api/brand-category/${id}`, ConfigToken);
  return data.title;
};
const updateBrand = async (brandData) => {
  const { id, Data } = brandData;
  const { data } = await request.put(
    `/api/brand-category/${id}`,
    Data,
    ConfigToken
  );
  return data;
};

const brandsService = {
  getbrand,
  addBrand,
  getSingleBrand,
  updateBrand,
};
export default brandsService;
