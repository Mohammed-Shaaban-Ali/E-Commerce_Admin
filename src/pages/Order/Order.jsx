import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrders, updateOrder } from "../../redux/slices/authSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const updateStatus = (id, value) => {
    const data = { id: id, status: value };
    dispatch(updateOrder(data));
  };
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
      title: "Amount",
      dataIndex: "amount",
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
      name:
        orders[i]?.shippingInfo?.firstName +
        " " +
        orders[i]?.shippingInfo?.lastName,
      Product: orders[i]?.orderItems?.map((item, index) => (
        <Link key={index} to={`/admin/view-order/${orders[i]?._id}`}>
          {item?.product?.title.substr(0, 30) + "..."}
        </Link>
      )),
      amount: orders[i]?.totalPriceAfterDiscount,
      date: new Date(orders[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            onChange={(e) => updateStatus(orders[i]?._id, e.target.value)}
            name=""
            className="form-control form-select"
          >
            <option value="Order" selected disabled>
              Order
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivert">Delivert</option>
          </select>
        </>
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
