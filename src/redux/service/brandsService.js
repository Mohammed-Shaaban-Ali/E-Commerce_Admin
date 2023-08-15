import request from "../../utils/request";

const getbrand = async () => {
  const { data } = await request.get("/api/brand-category/");
  return data;
};

const brandsService = {
  getbrand,
};
export default brandsService;
