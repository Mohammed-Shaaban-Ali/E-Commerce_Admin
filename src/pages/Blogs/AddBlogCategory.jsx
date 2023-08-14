import React from "react";
import CustomInput from "../../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Blog Category</h3>

        <div>
          <form>
            <CustomInput type="text" label="Enter Blog Category" />

            <button className="btn btn-success border-0 rounded-3 my-4">
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogCategory;
