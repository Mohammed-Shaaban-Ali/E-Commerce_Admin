import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getCuopons = async () => {
  const { data } = await request.get("/api/coupon/", ConfigToken);
  return data;
};
const addCuopons = async (color) => {
  const { data } = await request.post("/api/coupon/", color, ConfigToken);
  return data;
};

const couponService = {
  getCuopons,
  addCuopons,
};
export default couponService;
