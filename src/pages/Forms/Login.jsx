import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import "./Forms.css";

const Login = () => {
  return (
    <div
      className="py-5 "
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="m-auto my-5 w-25 bg-white rounded-3 p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center" style={{ color: "gray" }}>
          Login to your account to continue
        </p>
        <form>
          <CustomInput type="email" id="email" label="Enter Your Email" />
          <CustomInput
            type="password"
            id="password"
            label="Enter Your password"
          />
          <div className="text-end m-2">
            <Link to="/rorget-password">Forget Password</Link>
          </div>

          <div
            className="px-3 py-2 text-center"
            style={{ background: "#ffd333" }}
          >
            <Link
              to="/admin"
              className="border-0 text-white fw-bold w-100 text-white text-decoration-none"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
