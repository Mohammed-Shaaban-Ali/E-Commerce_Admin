import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addcolor, resetState } from "../../redux/slices/colorSlice";

let userSchema = object().shape({
  title: string().required("color Name is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess, createdcolor } = useSelector(
    (state) => state.colors
  );

  useEffect(() => {
    if (isSuccess && createdcolor) {
      toast.success("Color added successfully");
    }

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addcolor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Color</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="color"
              label="Color Name"
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
              Add Color
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddColor;
