import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import img from "../../../assets/Frontend_images/LoginPage2.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link } from "react-router-dom";

const Login = ({ notShow }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <div className="shadow-2xl">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img} className="w-[70%]" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">Login</h1>
                <p className="text-[#313866] text-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting.
                </p>
              </div>
              <div className="w-1/2 mt-6">
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
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-[#ED1450] text-white p-2 w-full rounded-full"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>
                  <Link to="/forgotpassword">
                    <p
                      onClick={handleOpenModal}
                      className="underline text-center text-[#ED1450] mt-4"
                    >
                      Forgot Your Password?
                    </p>
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

export default Login;
