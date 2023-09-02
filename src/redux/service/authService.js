import request from "../../utils/request";
import { toast } from "react-toastify";
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
const getSingleOrder = async (id) => {
  try {
    const { data } = await request.get(`/api/user/cart/getsingleOrder/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
const updateOrder = async (Data) => {
  const { id, status } = Data;
  try {
    const { data } = await request.put(`/api/user/cart/updateOrder/${id}`, {
      status,
    });
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
  getSingleOrder,
  updateOrder,
};
export default authService;
