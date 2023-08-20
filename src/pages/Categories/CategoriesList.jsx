import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteCategory,
  getcategory,
  resetState,
} from "../../redux/slices/categorySlice";
import CustomModal from "../../components/CustomModal";
import { toast } from "react-toastify";
const CategoriesList = () => {
  const [open, setOpen] = useState(false);
  const [categoryID, setcategoryID] = useState("");

  const dispatch = useDispatch();
  const { categories, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.productCategory
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getcategory());
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
  for (let i = 0; i < categories.length; i++) {
    data1.push({
      Key: i + 1,
      title: categories[i].title,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-category/${categories[i]._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(categories[i]._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  const showModal = (id) => {
    setOpen(true);
    setcategoryID(id);
  };
  const handleOk = (e) => {
    dispatch(deleteCategory(categoryID));
    setOpen(false);
    toast.success("Category deleted successfully");
    setTimeout(() => {
      dispatch(getcategory());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Categories List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this product category?"
      />
    </div>
  );
};

export default CategoriesList;
