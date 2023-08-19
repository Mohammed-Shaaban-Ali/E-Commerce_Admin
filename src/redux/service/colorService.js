import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getcolors = async () => {
  const { data } = await request.get("/api/color/");
  return data;
};
const addccolor = async (color) => {
  const { data } = await request.post("/api/color/", color, ConfigToken);
  return data;
};

const colorsService = {
  getcolors,
  addccolor,
};
export default colorsService;
