import request from "../../utils/request";

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
const getOrderbyid = async (id) => {
  try {
    const { data } = await request.get(`/api/user/cart/getorderbyid/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const authService = {
  login,
  getOrders,
};
export default authService;
