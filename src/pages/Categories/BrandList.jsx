import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBrand,
  getbrands,
  resetState,
} from "../../redux/slices/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { toast } from "react-toastify";

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandID, setbrandID] = useState("");

  const dispatch = useDispatch();
  const { brands, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.brands
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getbrands());
  }, []);
  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "id",
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
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      id: i + 1,
      title: brands[i].title,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-brand/${brands[i]._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(brands[i]._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }

  const showModal = (id) => {
    setOpen(true);
    setbrandID(id);
  };
  const handleOk = (e) => {
    dispatch(deleteBrand(brandID));
    setOpen(false);
    toast.success("Brand deleted successfully");

    setTimeout(() => {
      dispatch(getbrands());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BrandList;
