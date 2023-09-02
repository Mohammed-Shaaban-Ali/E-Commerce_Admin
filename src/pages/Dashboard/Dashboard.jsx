import "./Dashboard.css";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthWiseOrderIncom,
  getYearsTotalOrders,
} from "../../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { getYearsOrders, getOrderIncom } = useSelector((state) => state.auth);

  const [dataMonth, setDataMonth] = useState([]);
  const [dataOrderCount, setdataOrderCount] = useState([]);

  useEffect(() => {
    dispatch(getYearsTotalOrders());
    dispatch(getMonthWiseOrderIncom());
  }, []);

  useEffect(() => {
    let monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let data = [];
    let monthOrderCount = [];
    for (let i = 0; i < getOrderIncom?.length; i++) {
      const element = getOrderIncom[i];
      data.push({
        type: monthName[element?._id?.month],
        sales: element?.amount,
      });
      monthOrderCount.push({
        type: monthName[element?._id?.month],
        count: element?.count,
      });
    }
    setDataMonth(data);
    setdataOrderCount(monthOrderCount);
  }, [getOrderIncom]);
  // Cart
  const config2 = {
    data: dataOrderCount,
    xField: "type",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config = {
    data: dataMonth,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "SNo",
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
      title: "Status",
      dataIndex: "Status",
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      SNo: i,
      name: `Edward King ${i}`,
      Product: `Product ${i}`,
      Status: `Status ${i}`,
    });
  }
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-5">
        <div className="cardContant d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 ">
          <div>
            <p>Total Income </p>
            <h4>$ {getYearsOrders ? getYearsOrders[0]?.amount : ""}</h4>
          </div>
          <div className="">
            <div className="increase">
              <FaArrowTrendUp />
              <h6>32.7%</h6>
            </div>
            <p>Compared To Last Yeear</p>
          </div>
        </div>

        <div className="cardContant d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 ">
          <div>
            <p>Total Orders </p>
            <h4> {getYearsOrders ? getYearsOrders[0]?.count : ""}</h4>
          </div>
          <div>
            <div className="increase">
              <FaArrowTrendUp />
              <h6>27.1%</h6>
            </div>
            <p>Compared To Last Yeear</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-5">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 ">Income Statics</h3>
          <div>
            <Column {...config} />;
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 ">Total Orders</h3>
          <div>
            <Column {...config2} />;
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
