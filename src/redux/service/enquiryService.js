import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const getEnquiry = async () => {
  const { data } = await request.get("/api/enquiry/");
  return data;
};

const deleteEnquiry = async (id) => {
  const { data } = await request.delete(`/api/enquiry/${id}`, ConfigToken);
  return data;
};

const getsingleEnquiry = async (id) => {
  const { data } = await request.get(`/api/enquiry/${id}`, ConfigToken);
  return data;
};
const updateEnquiry = async (EnquiryData) => {
  const { id, Data } = EnquiryData;
  const { data } = await request.put(`/api/enquiry/${id}`, Data, ConfigToken);
  return data;
};
const enquiryService = {
  getEnquiry,
  deleteEnquiry,
  getsingleEnquiry,
  updateEnquiry,
};
export default enquiryService;
