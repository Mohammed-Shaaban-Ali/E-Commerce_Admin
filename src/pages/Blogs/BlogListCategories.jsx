import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteBlogCategory,
  getblogCategory,
  resetState,
} from "../../redux/slices/blogCategorySlice";
import CustomModal from "../../components/CustomModal";
import { toast } from "react-toastify";
import Reloader from "../../components/Reloader";

const BlogListCategories = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryID, setblogCategoryID] = useState("");

  const dispatch = useDispatch();
  const { blogCategory, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blogCategory
  );
  useEffect(() => {
    dispatch(resetState());

    dispatch(getblogCategory());
  }, []);
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < blogCategory.length; i++) {
    data1.push({
      Key: i + 1,
      title: blogCategory[i].title,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-blog-category/${blogCategory[i]._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(blogCategory[i]._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  const showModal = (id) => {
    setOpen(true);
    setblogCategoryID(id);
  };
  const handleOk = (e) => {
    dispatch(deleteBlogCategory(blogCategoryID));
    setOpen(false);
    toast.success("Blog Category deleted successfully");

    setTimeout(() => {
      dispatch(getblogCategory());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      {isLoading ? (
        <Reloader />
      ) : (
        <div className="mt-4">
          <h3 className="mb-4">Blog List Categoires</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      )}
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default BlogListCategories;
