import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getCuopons } from "../../redux/slices/couponSlice";

const CouponsList = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupons);
  useEffect(() => {
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
  for (let i = 0; i < coupons.length; i++) {
    data1.push({
      Key: i + 1,
      name: coupons[i].name,
      disCount: coupons[i].discount,
      expiry: new Date(coupons[i].expiry).toLocaleString(),
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
        <h3 className="mb-4">Coupons List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default CouponsList;
