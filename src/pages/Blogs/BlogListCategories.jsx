import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getblogCategory } from "../../redux/slices/blogCategorySlice";

const BlogListCategories = () => {
  const dispatch = useDispatch();
  const { blogCategory, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blogCategory
  );
  useEffect(() => {
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
          <Link style={{ color: "green" }} to="/1">
            <BiEdit />
          </Link>
          <Link style={{ color: "red" }} to="/2">
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Blog List Categoires</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default BlogListCategories;
