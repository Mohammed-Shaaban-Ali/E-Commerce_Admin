import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";
const login = async (userData) => {
  const { data } = await request.post("/api/user/login", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const getOrders = async () => {
  try {
    const { data } = await request.get("/api/user/cart/get-all-orders");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getMonthWiseOrderIncom = async () => {
  try {
    const { data } = await request.get(
      "/api/user/getMonthWiseOrderIncom",
      ConfigToken
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getYearsTotalOrders = async () => {
  try {
    const { data } = await request.get(
      "/api/user/getYearsTotalOrders",
      ConfigToken
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const authService = {
  login,
  getOrders,
  getMonthWiseOrderIncom,
  getYearsTotalOrders,
};
export default authService;
