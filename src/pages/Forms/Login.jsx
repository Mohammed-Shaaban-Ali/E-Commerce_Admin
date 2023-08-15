import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let userSchema = object({
    email: string().email().required(),
    password: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [navigate, user, isError, isLoading, isSuccess, message]);
  return (
    <div className="py-5 " style={{ background: "gray", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="m-auto my-5 w-25 bg-white rounded-3 p-4">
        <h3 className="text-center fw-bold">Login</h3>
        <p className="text-center" style={{ color: "gray" }}>
          Login to your account to continue
        </p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            id="email"
            label="Enter Your Email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <CustomInput
            type="password"
            id="password"
            label="Enter Your password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="text-end m-2">
            <Link to="/rorget-password">Forget Password</Link>
          </div>

          <button
            style={{ background: "gray" }}
            className="border-0 px-3 py-2 text-center text-white fw-bold w-100 text-white text-decoration-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
