import { Table } from "antd";
import { deleteblog, getblogs } from "../../redux/slices/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { resetState } from "../../redux/slices/brandSlice";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import Reloader from "../../components/Reloader";

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogID, setblogID] = useState("");

  const dispatch = useDispatch();
  const { blogs, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getblogs());
  }, []);
  // Table
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < blogs.length; i++) {
    data1.push({
      Key: i + 1,
      title: blogs[i].title,
      category: blogs[i].category,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-blog/${blogs[i]._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(blogs[i]._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }

  const showModal = (id) => {
    setOpen(true);
    setblogID(id);
  };
  const handleOk = (e) => {
    dispatch(deleteblog(blogID));
    setOpen(false);
    toast.success("blog deleted successfully");

    setTimeout(() => {
      dispatch(getblogs());
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
          <h3 className="mb-4">Blog List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      )}
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default BlogList;
