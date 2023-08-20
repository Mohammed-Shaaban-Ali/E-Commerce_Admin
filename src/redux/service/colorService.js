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

const getSingleColor = async (id) => {
  const { data } = await request.get(`/api/color/${id}`, ConfigToken);
  return data.title;
};

const updateColor = async (colorData) => {
  const { id, Data } = colorData;
  const { data } = await request.put(`/api/color/${id}`, Data, ConfigToken);
  return data;
};

const deleteColor = async (id) => {
  const { data } = await request.delete(
    `/api/color/${id}`,

    ConfigToken
  );
  return data;
};
const colorsService = {
  getcolors,
  addccolor,
  getSingleColor,
  updateColor,
  deleteColor,
};
export default colorsService;
