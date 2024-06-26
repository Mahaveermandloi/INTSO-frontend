import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/Frontend_images/LoginPage2.png";
import logo from "../../../assets/Frontend_images/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IP_ADDRESS, PORT } from "../utils/constants";

const ChangePassword = ({ notShow }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Required"),
  });

  // Initialize Formik for handling form state and validation
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/user/updatenewpassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: values.newPassword }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          navigate("/success");
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Failed to reset password. Please try again."
          );
        }
      } catch (err) {
        console.error("Password reset failed:", err);
        setError("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Toggle visibility of password inputs
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShow) => !prevShow);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShow) => !prevShow);
  };

  // Component JSX
  return (
    <div className="md:mx-20 mx-5">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img} className="w-[70%]" alt="Login Page" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="" alt="Logo" />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">
                  Reset Password
                </h1>
                <p className="text-[#313866] text-center">
                  Set the new password for your account so you can sign in and
                  access all the features
                </p>
              </div>
              <div className="sm:w-2/3 mt-6 w-full">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="flex flex-col relative">
                    <label className="text-[#313866]">New Password</label>
                    <input
                      type={showPassword1 ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter New Password"
                      className={`border border-[#C5CAD9] p-2 rounded-lg ${
                        formik.touched.newPassword && formik.errors.newPassword
                          ? "border-red-500"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                    />
                    <div
                      className="absolute right-3 top-8 cursor-pointer"
                      onClick={togglePasswordVisibility1}>
                      {showPassword1 ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <div className="text-red-500">
                        {formik.errors.newPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col relative">
                    <label className="text-[#313866]">Confirm Password</label>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      className={`border border-[#C5CAD9] p-2 rounded-lg ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <div
                      className="absolute right-3 top-8 cursor-pointer"
                      onClick={togglePasswordVisibility2}>
                      {showPassword2 ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="text-red-500">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <div className="mt-5 flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white"
                      disabled={formik.isSubmitting}>
                      Reset Password
                    </button>
                  </div>
                  <Link to="/otp">
                    <div className="hidden md:block mt-8">
                      <p className="rounded-full text-lg text-[#ED1450]">
                        <ArrowBackIcon />
                        Back
                      </p>
                    </div>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
