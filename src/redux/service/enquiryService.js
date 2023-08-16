import request from "../../utils/request";

const getEnquiry = async () => {
  const { data } = await request.get("/api/enquiry/");

  return data;
};

const enquiryService = {
  getEnquiry,
};
export default enquiryService;
