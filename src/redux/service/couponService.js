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

const getSingleCoupon = async (id) => {
  const { data } = await request.get(`/api/coupon/${id}`, ConfigToken);
  return data;
};

const updateCoupon = async (CouponData) => {
  const { id, Data } = CouponData;
  const { data } = await request.put(`/api/coupon/${id}`, Data, ConfigToken);
  return data;
};

const deleteCoupon = async (id) => {
  const { data } = await request.delete(`/api/coupon/${id}`, ConfigToken);
  return data;
};

const couponService = {
  getCuopons,
  addCuopons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
export default couponService;
