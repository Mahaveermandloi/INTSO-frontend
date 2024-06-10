import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CancelIcon from "@mui/icons-material/Cancel";
import ForgotPassword from "./ForgotPassword";
import { Button, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import Login from "./Login";
import img from "../../../assets/Frontend_images/success (2).png";
import logo from "../../../assets/Frontend_images/logo.png";

const Success = ({ notShow }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    <div className="shadow-2xl">
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
                  Congratulations
                </h1>
                <p className="text-[#313866] text-center">
                  Your password is reset successfully. You can sign in with your
                  new password
                </p>
              </div>
              <div className="mt-5">
                <Link to="/login">
                  <button
                    type="submit"
                    className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white"
                    onClick={handleOpenModal}
                    disabled={formik.isSubmitting}
                  >
                    Back to Login
                    {/* {formik.isSubmitting ? "Forgoting..." : "Forgot"} */}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
