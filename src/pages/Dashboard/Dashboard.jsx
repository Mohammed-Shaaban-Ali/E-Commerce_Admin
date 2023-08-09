import "./Dashboard.css";
import { Column } from "@ant-design/plots";

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 85,
    },
    {
      type: "Spt",
      sales: 65,
    },
    {
      type: "Oct",
      sales: 22,
    },
    {
      type: "Nov",
      sales: 50,
    },
    {
      type: "Dev",
      sales: 48,
    },
  ];
  const config = {
    data,
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
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="cardContant d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 ">
          <div>
            <p>Total Sells </p>
            <h4>$100.43</h4>
          </div>
          <div className="">
            <div className="increase">
              <FaArrowTrendUp />
              <h6>32.7%</h6>
            </div>
            <p>Compared To April 2022</p>
          </div>
        </div>

        <div className="cardContant d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 ">
          <div>
            <p>Average Order Value </p>
            <h4>$272.35</h4>
          </div>
          <div className="">
            <div className="dencrease">
              <FaArrowTrendDown />
              <h6>12.0%</h6>
            </div>
            <p>Compared To April 2022</p>
          </div>
        </div>

        <div className="cardContant d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 ">
          <div>
            <p>Total Orders </p>
            <h4>243</h4>
          </div>
          <div>
            <div className="increase">
              <FaArrowTrendUp />
              <h6>27.1%</h6>
            </div>
            <p>Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />;
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
