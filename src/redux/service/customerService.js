import request from "../../utils/request";

const getUsers = async () => {
  const { data } = await request.get("/api/user/all-users");

  return data;
};

const customerService = {
  getUsers,
};
export default customerService;
