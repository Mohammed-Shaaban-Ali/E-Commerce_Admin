import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  addcategory,
  getSinglecategry,
  resetState,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object().shape({
  title: string().required("Category Name is required"),
});

const AddCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    createdcategory,
    singlecategory,
    updateCategoryData,
  } = useSelector((state) => state.productCategory);
  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(getSinglecategry(categoryId));
    } else {
      dispatch(resetState());
    }
  }, []);
  useEffect(() => {
    if (isSuccess && createdcategory)
      toast.success("Category added successfully");
    if (isSuccess && updateCategoryData)
      toast.success("Category updated successfully");
    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singlecategory || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (categoryId !== undefined) {
        const data = { id: categoryId, Data: values };
        dispatch(updateCategory(data));
        setTimeout(() => {
          navigate("/admin/category-list");
        }, 1000);
      } else {
        dispatch(addcategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">
          {categoryId !== undefined ? "Edit" : "Add"} Category
        </h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Category Brand Name"
              name="title"
              id="title"
              onChange={formik.handleChange("title")}
              value={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              {categoryId !== undefined ? "Edit" : "Add"} Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
