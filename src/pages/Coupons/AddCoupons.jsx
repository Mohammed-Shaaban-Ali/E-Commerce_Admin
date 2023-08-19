import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { date, object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addCuopons, resetState } from "../../redux/slices/couponSlice";

let userSchema = object().shape({
  name: string().required("Coupon Name is required"),
  expiry: date().required("Expiry date is required"),
  discount: string().required("Discount Number is required"),
});
const AddCoupons = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess, createdcoupon } = useSelector(
    (state) => state.coupons
  );

  useEffect(() => {
    if (isSuccess && createdcoupon) {
      toast.success("Coupon added successfully");
    }
    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      discount: "",
      expiry: "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addCuopons(values));
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
              type="text"
              label="Coupon Name"
              name="name"
              id="name"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>

            <CustomInput
              type="date"
              label="Expiry date"
              name="expiry"
              id="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry ? (
                <div>{formik.errors.expiry}</div>
              ) : null}
            </div>

            <CustomInput
              type="number"
              label="Descount Number"
              name="discount"
              id="discount"
              onChange={formik.handleChange("discount")}
              value={formik.values.discount}
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount ? (
                <div>{formik.errors.discount}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupons;
