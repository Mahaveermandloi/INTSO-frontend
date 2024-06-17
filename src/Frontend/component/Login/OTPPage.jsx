import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import img from "../../../assets/Frontend_images/OTP.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IP_ADDRESS, PORT } from "../utils/constants";

const OTPPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Initial countdown time for 2 minutes
  const [resendEnabled, setResendEnabled] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Schema for validation
  const validationSchema = Yup.object().shape({
    otp1: Yup.string().length(1, "Enter a single digit").required("Required"),
    otp2: Yup.string().length(1, "Enter a single digit").required("Required"),
    otp3: Yup.string().length(1, "Enter a single digit").required("Required"),
    otp4: Yup.string().length(1, "Enter a single digit").required("Required"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const otpCode = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/user/verifyuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ getOtp: otpCode }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          navigate("/changepassword");
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Failed to verify OTP. Please try again."
          );
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setError("An error occurred. Please try again later.");
      }
    },
  });

  // Countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setResendEnabled(true);
    }
  }, [timeLeft]);

  // Resend OTP handler
  const handleResendOTP = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/user/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setError("OTP resend successfully");
        setTimeLeft(120);
        setResendEnabled(false);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to resend OTP. Please try again."
        );
      }
    } catch (err) {
      console.error("Resend failed:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  // Component JSX
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 ">
        <div className="grid md:grid-cols-2 gap-y-4 grid-cols-1 ">
          <div className="bg-white hidden md:block sm:px-10 px-2 py-10 rounded-l-2xl">
            <div className="flex justify-center items-center mt-24">
              <img src={img} className="w-[70%]" alt="OTP" />
            </div>
          </div>
          <div className="bg-[#FAFAFA] sm:px-14 px-2 py-10 rounded-r-2xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="" alt="Logo" />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <h1 className="text-[#ED1450] text-3xl font-bold">
                  Enter 4 Digit OTP
                </h1>
                <p className="text-[#313866] text-center">
                  We have sent you OTP code on your email address, Please verify
                  the OTP
                </p>
              </div>
              <div className="sm:w-1/2 mt-6 w-full">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Enter Code</label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          name={`otp${index}`}
                          className={`border ${
                            formik.errors[`otp${index}`] &&
                            formik.touched[`otp${index}`]
                              ? "border-red-500"
                              : "border-gray-300"
                          } w-16 p-3 text-lg rounded-lg text-center`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values[`otp${index}`]}
                        />
                      ))}
                    </div>
                    {formik.errors.otp1 &&
                      formik.touched.otp1 &&
                      formik.errors.otp2 &&
                      formik.touched.otp2 &&
                      formik.errors.otp3 &&
                      formik.touched.otp3 &&
                      formik.errors.otp4 &&
                      formik.touched.otp4 && (
                        <div className="text-red-500">
                          Please enter valid OTP
                        </div>
                      )}
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <div className="mt-5 flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white">
                      Next
                    </button>
                  </div>
                  <div className="mt-5 flex justify-between ">
                    {resendEnabled ? (
                      <button
                        type="button"
                        className="bg-gray-300 px-6 p-2 rounded-full font-bold text-lg text-black"
                        onClick={handleResendOTP}>
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-lg text-[#ED1450]">
                        Resend {Math.floor(timeLeft / 60)}:
                        {("0" + (timeLeft % 60)).slice(-2)} sec
                      </p>
                    )}
                  </div>
                  <Link to="/forgotpassword">
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

export default OTPPage;
