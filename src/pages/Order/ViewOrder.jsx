import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrderbyid, getOrders } from "../../redux/slices/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderbyid(orderId));
  }, []);
  const order = useSelector((state) => state.auth.ordersbyid);

  const productsOrder = order ? order[0].products : [];
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
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "Price",
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
  for (let i = 0; i < productsOrder?.length; i++) {
    data1.push({
      Key: i + 1,
      name: productsOrder[i]?.product?.title,
      brand: productsOrder[i]?.product?.brand,

      color: (
        <div>
          {productsOrder[i]?.product?.color?.map((e, inx) => (
            <div
              key={inx}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: `${e.color}`,
              }}
            ></div>
          ))}
        </div>
      ),
      count: productsOrder[i]?.count,
      Price: productsOrder[i]?.product?.price,
      date: new Date(productsOrder[i]?.product?.createdAt).toLocaleString(),
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
        <h3 className="mb-4">View Order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
