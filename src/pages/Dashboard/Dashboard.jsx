import "./Dashboard.css";

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Dashboard = () => {
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
    </div>
  );
};

export default Dashboard;
