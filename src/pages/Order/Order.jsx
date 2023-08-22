import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrders } from "../../redux/slices/authSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getOrders());
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
      title: "Product",
      dataIndex: "Product",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < orders?.length; i++) {
    data1.push({
      Key: i + 1,
      name: orders[i].orderBy.firstName + " " + orders[i].orderBy.lastName,
      Product: orders[i].products?.map((i) => {
        return (
          <>
            <ul key={i}>
              <p>
                <Link to={`/admin/view-order/${i.product._id}`}>
                  {i.product?.title}
                </Link>
              </p>
            </ul>
          </>
        );
      }),
      price: orders[i].products?.map((i) => {
        return (
          <>
            <ul key={i}>
              <li key={i}>
                <p>{i.product?.price}</p>
              </li>
            </ul>
          </>
        );
      }),
      date: new Date(orders[i].createdAt).toLocaleString(),
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
        <h3 className="mb-4">Order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Order;
