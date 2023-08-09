import CustomInput from "../../components/CustomInput";
import "./Forms.css";

const ResetPassword = () => {
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
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center" style={{ color: "gray" }}>
          Enter Your New Password
        </p>
        <form>
          <CustomInput type="password" id="password" label="New Password" />
          <CustomInput type="password" id="password" label="Confirm password" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
