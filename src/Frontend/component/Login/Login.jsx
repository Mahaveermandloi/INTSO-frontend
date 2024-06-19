import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import img from "../../../assets/Frontend_images/LoginPage2.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleIcon = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/user/login`,
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
          const token = data.token;
          const email = data.student.email;

          localStorage.setItem("token", token);
          localStorage.setItem("email", email);

          toast.success("Login successfully!");
          formik.resetForm();
          navigate("/");
          window.location.reload();
        } else if (res.status === 401) {
          toast.error("Invalid credentials. Please try again.");
        } else if (res.status === 404) {
          toast.error("Student not found. Please check your email.");
        } else {
          const errorData = await res.json();
          toast.error(
            `Login failed: ${errorData.message || "Please try again."}`
          );
        }
      } catch (err) {
        toast.error("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-6">
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
                <div className="w-2/3 mt-6">
                  <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col">
                      <label className="text-[#313866]">Email ID</label>
                      <input
                        required
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border p-2 rounded-lg ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : "border-[#C5CAD9]"
                        }`}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm">
                          {formik.errors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col relative">
                      <label className="text-[#313866]">Password</label>
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your password"
                        className={`border p-2 rounded-lg ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : "border-[#C5CAD9]"
                        }`}
                      />
                      {showPassword ? (
                        <VisibilityIcon
                          onClick={toggleIcon}
                          className="absolute right-3 top-8 cursor-pointer"
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={toggleIcon}
                          className="absolute right-3 top-8 cursor-pointer"
                        />
                      )}
                      {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-sm">
                          {formik.errors.password}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-[#ED1450] text-white p-2 w-full rounded-full"
                        disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </div>
                    <Link to="/forgotpassword">
                      <p className="underline text-center text-[#ED1450] mt-4">
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
    </>
  );
};

export default Login;
