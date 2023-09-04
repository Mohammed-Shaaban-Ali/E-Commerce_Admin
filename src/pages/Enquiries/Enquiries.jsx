import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import {
  deleteEnquiry,
  getenquiries,
  resetState,
  updateEnquiry,
} from "../../redux/slices/enquirySlice";
import CustomModal from "../../components/CustomModal";
import { toast } from "react-toastify";

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqID, setenqID] = useState("");
  const dispatch = useDispatch();
  const { enquiries, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.enquiries
  );
  useEffect(() => {
    dispatch(resetState());
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
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < enquiries?.length; i++) {
    data1.push({
      Key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      status: (
        <>
          <select
            name="Status"
            className="form-control form-select"
            defaultValue={
              enquiries[i].status ? enquiries[i].status : "Summitted"
            }
            onChange={(e) => setupdateStatus(e.target.value, enquiries[i]._id)}
            id="Status"
          >
            <option value="Summitted">Summitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(enquiries[i]._id)}
          >
            <AiFillDelete />
          </Link>
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-enquiries/${enquiries[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
        </div>
      ),
    });
  }
  const showModal = (id) => {
    setOpen(true);
    setenqID(id);
  };
  const handleOk = (e) => {
    dispatch(deleteEnquiry(enqID));
    setOpen(false);
    toast.success("Enquiry deleted successfully");

    setTimeout(() => {
      dispatch(getenquiries());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };

  const setupdateStatus = (e, id) => {
    const data = {
      id: id,
      Data: {
        status: e,
      },
    };
    dispatch(updateEnquiry(data));
    toast.success("Enquiry Status Update successfully");
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
