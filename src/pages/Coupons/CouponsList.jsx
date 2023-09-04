import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deletecoupon,
  getCuopons,
  resetState,
} from "../../redux/slices/couponSlice";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";

const CouponsList = () => {
  const [open, setOpen] = useState(false);
  const [couponID, setcouponID] = useState("");

  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupons);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCuopons());
  }, []);

  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "disCount",
      dataIndex: "disCount",
      sorter: (a, b) => a.disCount - b.disCount,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < coupons?.length; i++) {
    data1.push({
      Key: i + 1,
      name: coupons[i]?.name,
      disCount: coupons[i]?.discount,
      expiry: new Date(coupons[i]?.expiry).toLocaleString(),
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-coupon/${coupons[i]?._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(coupons[i]?._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  const showModal = (id) => {
    setOpen(true);
    setcouponID(id);
  };
  const handleOk = (e) => {
    dispatch(deletecoupon(couponID));
    setOpen(false);
    toast.success("coupon deleted successfully");
    setTimeout(() => {
      dispatch(getCuopons());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Coupons List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default CouponsList;
