import React from "react";

const CustomInput = ({ type, label, id, iclass }) => {
  return (
    <div className="form-fade mb-3">
      <input
        type={type}
        id={id}
        className={`form-control ${iclass}`}
        placeholder={label}
      />
    </div>
  );
};

export default CustomInput;
