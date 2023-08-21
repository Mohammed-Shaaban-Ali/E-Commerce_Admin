import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getsingleEnquiry,
  updateEnquiry,
} from "../../redux/slices/enquirySlice";
import { toast } from "react-toastify";
const EditEnquiries = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqName, enqStatus, enqComment, enqEmail, enqMobile } = useSelector(
    (state) => state.enquiries
  );
  const enqId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getsingleEnquiry(enqId));
  }, []);
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
      <div className="mt-4 d-flex align-items-center justify-content-between">
        <h3 className="mb-4">Edit Enquiries</h3>
        <button
          onClick={() => navigate(-1)}
          className="btn bg-danger text-white"
        >
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold ">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+20${enqMobile}`}>{enqMobile}</a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Status:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>

        <div className="d-flex align-items-center formcontrols gap-3">
          <h6 className="mb-0 fw-bold">Change Status:</h6>
          <div className="">
            <select
              onChange={(e) => setupdateStatus(e.target.value, enqId)}
              name="Status"
              className="form-control form-select"
              defaultValue={enqStatus ? enqStatus : "Summitted"}
              id="Status"
            >
              <option value="Summitted">Summitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEnquiries;
