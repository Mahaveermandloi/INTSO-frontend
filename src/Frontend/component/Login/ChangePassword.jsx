import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import img from "../../../assets/Frontend_images/LoginPage2.png";
import logo from "../../../assets/Frontend_images/logo.png"


const ChangePassword = ({ notShow }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

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
    <div className="shadow-2xl md:mx-20  mx-5 ">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1 ">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img} className="w-[70%]" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="" />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">
                  Reset Password
                </h1>
                <p className="text-[#313866] text-center">
                  Set the new password for your account so you can sign in and
                  access all the features
                </p>
              </div>
              <div className="sm:w-1/2 mt-6 w-full">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[#313866]">New Password</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter New Password"
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Confirm Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Confirm Password"
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="mt-5 flex justify-center">
                    <Link to="/success">
                      <button
                        type="submit"
                        className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white"
                        onClick={handleOpenModal}
                        disabled={formik.isSubmitting}>
                        Reset Password
                        {/* {formik.isSubmitting ? "Verifying..." : "Verify"} */}
                      </button>
                    </Link>
                  </div>
                  <Link to="/otp">
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

export default ChangePassword;
