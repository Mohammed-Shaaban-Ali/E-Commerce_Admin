import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  addcolor,
  getSinglecolor,
  resetState,
  updatecolor,
} from "../../redux/slices/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object().shape({
  title: string().required("color Name is required"),
});

const AddColor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const colorId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    createdcolor,
    singlecolor,
    updateColorData,
  } = useSelector((state) => state.colors);

  useEffect(() => {
    if (colorId !== undefined) {
      dispatch(getSinglecolor(colorId));
    } else {
      dispatch(resetState());
    }
  }, []);

  useEffect(() => {
    if (isSuccess && createdcolor) {
      toast.success("Color added successfully");
    }
    if (isSuccess && updateColorData)
      toast.success("Color updated successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singlecolor || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (colorId !== undefined) {
        const data = { id: colorId, Data: values };
        dispatch(updatecolor(data));
        setTimeout(() => {
          navigate("/admin/color-list");
        }, 1000);
      } else {
        dispatch(addcolor(values));
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
        <h3 className="mb-4">{colorId !== undefined ? "Edit" : "Add"} Color</h3>

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
              disabled={isLoading ? true : false}
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              {colorId !== undefined ? "Edit" : "Add"} Color
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddColor;
