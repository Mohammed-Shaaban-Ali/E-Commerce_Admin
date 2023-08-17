import request from "../../utils/request";

const { token } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
};

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

const authService = {
  login,
  getOrders,
};
export default authService;
