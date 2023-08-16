import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getenquiries } from "../../redux/slices/enquirySlice";

const Enquiries = () => {
  const dispatch = useDispatch();
  const { enquiries, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.enquiries
  );
  useEffect(() => {
    dispatch(getenquiries());
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < enquiries.length; i++) {
    data1.push({
      Key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      status: (
        <>
          <select name="" className="form-control form-select" id="">
            <option value="">set value</option>
          </select>
        </>
      ),
      action: (
        <div className="d-flex gap-4 fs-5">
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
        <h3 className="mb-4">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
