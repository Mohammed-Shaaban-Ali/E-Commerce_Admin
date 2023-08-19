import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { addBrand, resetState } from "../../redux/slices/brandSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";

let userSchema = object().shape({
  title: string().required("Brand Name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess, createdbrand } = useSelector(
    (state) => state.brands
  );

  useEffect(() => {
    if (isSuccess && createdbrand) toast.success("Brand added successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Brand</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Brand Name"
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
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
