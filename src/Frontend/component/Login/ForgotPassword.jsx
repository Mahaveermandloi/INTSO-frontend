import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "../../../assets/Frontend_images/forgotPassword.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/user/forgetpassword`,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
       
          setStatus({
            msg: "OTP has been sent successfully!",
            type: "success",
          });
          navigate("/otp"); // Redirect to the OTP page
        } else {
          setStatus({
            msg: "Failed to send OTP. Please try again.",
            type: "error",
          });
        }
      } catch (err) {
        console.error("Sending OTP failed:", err);
        setStatus({
          msg: "An error occurred. Please try again later.",
          type: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 ">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1 ">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img1} className="w-[70%]" alt="Forgot Password" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="" alt="Logo" />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">
                  Forgot Password?
                </h1>
                <p className="text-[#313866] text-center">
                  Please enter your registered email address to receive an OTP
                </p>
              </div>
              <div className="sm:w-2/3 mt-6 w-full">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Email ID</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      className={`border ${
                        formik.errors.email && formik.touched.email
                          ? "border-red-500"
                          : "border-[#C5CAD9]"
                      } p-2 rounded-lg`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white"
                      disabled={formik.isSubmitting}>
                      {formik.isSubmitting ? "Submitting..." : "Get OTP"}
                    </button>
                  </div>
                  <Link to="/login">
                    <div className="hidden md:block mt-8">
                      <p className="rounded-full text-lg text-[#ED1450]">
                        <ArrowBackIcon />
                        Back
                      </p>
                    </div>
                  </Link>
                </form>
                {formik.status && (
                  <div
                    className={`mt-4 text-center text-${
                      formik.status.type === "error" ? "red-500" : "green-500"
                    }`}>
                    {formik.status.msg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
