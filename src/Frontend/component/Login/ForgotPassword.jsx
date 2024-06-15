import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "../../../assets/Frontend_images/forgotPassword.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/user/forgetpassword`,
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setStatusMessage("OTP has been sent successfully!");
          navigate("/otp"); // Redirect to the OTP page
        } else {
          setStatusMessage("Failed to send OTP. Please try again.");
        }
      } catch (err) {
        console.error("Sending OTP failed:", err);
        setStatusMessage("An error occurred. Please try again later.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 ">
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
                  Please enter your registered email address to receive a get
                  OTP
                </p>
              </div>
              <div className="sm:w-2/3 mt-6 w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Email ID</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#ED1450] px-6 p-2 rounded-full font-bold text-lg text-white">
                      Get OTP
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
                {statusMessage && (
                  <div className="mt-4 text-center text-red-500">
                    {statusMessage}
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
