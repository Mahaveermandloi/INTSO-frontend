import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "../../../assets/Frontend_images/forgotPassword.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ForgotPassword = ({ notShow }) => {
  const [showModal, setShowModal] = useState(false);

  const [closeLogin, setCloseLogin] = useState(!notShow);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setCloseLogin(false);
    notShow = closeLogin;
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Define the validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  return (
    <div className="shadow-2xl  ">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1 ">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img1} className="w-[70%]" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="" />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">
                  Forgot Password?
                </h1>
                <p className="text-[#313866] text-center">
                  Please enter your registered email address to Receive a get
                  OTP
                </p>
              </div>
              <div className="sm:w-1/2 mt-6 w-full">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Email ID</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mt-5 flex justify-center">
                    <Link to="/otp">
                      <button
                        type="submit"
                        className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white"
                        onClick={handleOpenModal}
                        disabled={formik.isSubmitting}
                      >
                        Get OTP
                        {/* {formik.isSubmitting ? "Forgoting..." : "Forgot"} */}
                      </button>
                    </Link>
                  </div>
                  <Link to="/login">
                    <div className="hidden md:block">
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

export default ForgotPassword;
