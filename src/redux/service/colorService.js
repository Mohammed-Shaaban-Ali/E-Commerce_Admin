import request from "../../utils/request";

const getcolors = async () => {
  const { data } = await request.get("/api/color/");
  return data;
};

const colorsService = {
  getcolors,
};
export default colorsService;
