import request from "../../utils/request";
import { ConfigToken } from "../../utils/validateToken";

const uploadImg = async (images) => {
  const { data } = await request.post("api/upload/", images, ConfigToken);
  return data;
};
const deleteImg = async (id) => {
  const { data } = await request.delete(
    `api/upload/delete-image/${id}`,
    ConfigToken
  );
  return data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};
export default uploadService;
