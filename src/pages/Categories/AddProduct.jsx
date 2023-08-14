import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [value, setValue] = useState("");

  const handelDescription = (e) => {
    setValue(e);
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Product</h3>

        <div>
          <form>
            <CustomInput type="text" label="Enter product title" />

            <div className="mb-4">
              <ReactQuill
                theme="snow"
                value={value}
                placeholder="Enter product description"
                onChange={(e) => handelDescription(e)}
              />
            </div>

            <CustomInput type="number" label="Enter product price" />

            <select className="form-control py-2 mb-3" name="" id="">
              <option value="">Select Brand</option>
            </select>

            <select className="form-control py-2 mb-3" name="" id="">
              <option value="">Select Cateigory</option>
            </select>

            <select className="form-control py-2 mb-3" name="" id="">
              <option value="">Select Color</option>
            </select>

            <button className="btn btn-success border-0 rounded-3 my-4">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
