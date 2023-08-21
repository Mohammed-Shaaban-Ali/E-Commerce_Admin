import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { date, object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  addCuopons,
  getSinglecoupon,
  resetState,
  updatecoupon,
} from "../../redux/slices/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object().shape({
  name: string().required("Coupon Name is required"),
  expiry: date().required("Expiry date is required"),
  discount: string().required("Discount Number is required"),
});
const AddCoupons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const couponId = location.pathname.split("/")[3];

  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    createdcoupon,
    updateCouponData,
    couponName,
    couponDiscount,
    couponExpiry,
  } = useSelector((state) => state.coupons);
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (couponId !== undefined) {
      dispatch(getSinglecoupon(couponId));
    } else {
      dispatch(resetState());
    }
  }, []);

  useEffect(() => {
    if (isSuccess && createdcoupon) {
      toast.success("Coupon added successfully");
    }
    if (isSuccess && updateCouponData)
      toast.success("Coupon updated successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      discount: couponDiscount || "",
      expiry: changeDateFormet(couponExpiry) || "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (couponId !== undefined) {
        const data = { id: couponId, Data: values };
        dispatch(updatecoupon(data));
        setTimeout(() => {
          navigate("/admin/coupon-list");
        }, 1000);
      } else {
        dispatch(addCuopons(values));
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
          {couponId !== undefined ? "Edit" : "Add"} Coupon
        </h3>

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
              {couponId !== undefined ? "Edit" : "Add"} Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupons;
