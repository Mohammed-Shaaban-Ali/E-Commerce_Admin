import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addcategory } from "../../redux/slices/categorySlice";

let userSchema = object().shape({
  title: string().required("Category Name is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess, createdcategory } = useSelector(
    (state) => state.productCategory
  );

  useEffect(() => {
    if (isSuccess && createdcategory) toast.success("Brand added successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addcategory(values));
      formik.resetForm();
    },
  });
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Category</h3>

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
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
