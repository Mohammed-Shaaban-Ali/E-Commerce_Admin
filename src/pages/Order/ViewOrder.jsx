import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getSingleOrder } from "../../redux/slices/authSlice";
import Reloader from "../../components/Reloader";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.pathname.split("/")[3];
  const { singleorder, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, []);

  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Price",
      dataIndex: "Price",
    },
    {
      title: "Color",
      dataIndex: "color",
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
  for (let i = 0; i < singleorder?.length; i++) {
    data1.push({
      Key: i + 1,
      name: singleorder[i]?.orderItems?.map((item, index) => (
        <p style={{ width: "400px" }} key={index}>
          {item?.product?.title}
        </p>
      )),
      brand: singleorder[i]?.orderItems?.map((item, index) => (
        <p key={index}>{item?.product?.brand}</p>
      )),

      count: singleorder[i]?.orderItems?.map((item, index) => (
        <p key={index}>{item?.quantity}</p>
      )),

      color: (
        <div>
          {singleorder[i]?.orderItems?.map((e, inx) => (
            <div
              key={inx}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: `${e?.color?.title}`,
              }}
            ></div>
          ))}
        </div>
      ),

      Price: singleorder[i]?.orderItems?.map((item, index) => (
        <p key={index}>{item?.price}</p>
      )),
      date: new Date(singleorder[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            defaultValue={singleorder[i]?.orderStatus}
            name=""
            className="form-control form-select"
          >
            <option value="Order">Order</option>
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
      {isLoading ? (
        <Reloader />
      ) : (
        <div className="mt-4">
          <h3 className="mb-4">View Order</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
