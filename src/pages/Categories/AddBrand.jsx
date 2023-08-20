import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import {
  addBrand,
  getSingleBrand,
  resetState,
  updateBrand,
} from "../../redux/slices/brandSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";

let userSchema = object().shape({
  title: string().required("Brand Name is required"),
});

const AddBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const brandId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    createdbrand,
    singlebrand,
    updateBrandData,
  } = useSelector((state) => state.brands);

  useEffect(() => {
    if (brandId !== undefined) {
      dispatch(getSingleBrand(brandId));
    } else {
      dispatch(resetState());
    }
  }, []);
  useEffect(() => {
    if (isSuccess && createdbrand) toast.success("Brand added successfully");
    if (isSuccess && updateBrandData)
      toast.success("Brand updated successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singlebrand || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (brandId !== undefined) {
        const data = { id: brandId, Data: values };
        dispatch(updateBrand(data));
        setTimeout(() => {
          navigate("/admin/brand-list");
        }, 1000);
      } else {
        dispatch(addBrand(values));
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
        <h3 className="mb-4">{brandId !== undefined ? "Edit" : "Add"} Brand</h3>

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
              {brandId !== undefined ? "Edit" : "Add"} Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
