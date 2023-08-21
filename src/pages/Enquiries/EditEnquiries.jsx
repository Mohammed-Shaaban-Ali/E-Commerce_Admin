import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getsingleEnquiry } from "../../redux/slices/enquirySlice";
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
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Edit Enquiries</h3>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
      </div>
    </div>
  );
};

export default EditEnquiries;
