import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import useFormValidation from "../utils/hooks/useFormValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import img from "../../../../src/assets/Frontend_images/Regitration_Graphics.png";

const RegisterForm = () => {
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    school_name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    district: "",
    STD_code: "",
    landline: "",
    pincode: "",
    mobile_number: "",
    principal_name_prefix: "",
    principal_name: "",
    syllabus: "",
  });

  const { errors, validate, setIsSubmitting } = useFormValidation(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    validate(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/school/registerSchool`,
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) {
          const data = await res.json();
          toast.success("Your message has been sent successfully!");
          setFormData({
            school_name: "",
            email: "",
            address: "",
            city: "",
            state: "",
            district: "",
            STD_code: "",
            landline: "",
            pincode: "",
            mobile_number: "",
            principal_name_prefix: "",
            principal_name: "",
            syllabus: "",
          });
        } else if (res.status === 409) {
          toast.error("This email is already registered.");
        } else if (res.status === 400) {
          toast.error("please fill the all required fields");
        }
      } catch (err) {
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please correct the errors and try again.");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <ToastContainer />
      <div className="shadow-inner shadow-gray-300 mb-20" data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
          <div className="sm:mx-20 mx-5 shadow-xl">
            <div className="flex flex-col py-7 justify-center items-center ">
              <h1 className="text-[#ED1450] font-bold text-2xl ">
                School Registration Form
              </h1>
              <p className="w-20 border-b-2 border-[#ED1450]"></p>
              <img src={img} className="mt-10" alt="Registration Graphic" />
            </div>
            <form
              className="flex flex-col md:px-10 p-6"
              onSubmit={handleSubmit}>
              <div className="grid gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    School Name<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="Enter Your school name"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.school_name && (
                    <p className="text-red-500 text-sm">{errors.school_name}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Email<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email.ID"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label className="text-left p-2">
                    School Address
                    <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your school Address"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    City<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter Your City"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div className="relative flex flex-col">
                  <label className="text-left p-2">
                    State<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}>
                    <option value="">Select Your State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    District<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter Your District"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.district && (
                    <p className="text-red-500 text-sm">{errors.district}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Pin Code<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Your Pin code"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm">{errors.pincode}</p>
                  )}
                </div>
                <div className="text-start">
                  <div className="flex gap-3">
                    <label className="p-2 text-nowrap">
                      STD Code<span className="text-red-500 text-lg">*</span>
                    </label>
                    <label className="p-2 text-nowrap">
                      Landline Number
                      <span className="text-red-500 text-lg">*</span>
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      name="STD_code"
                      value={formData.STD_code}
                      onChange={handleChange}
                      placeholder="STD Code"
                      className="p-2 border border-gray-300 rounded-l-lg max-w-24"
                    />

                    <input
                      type="text"
                      name="landline"
                      value={formData.landline}
                      onChange={handleChange}
                      placeholder="Enter Landline Number"
                      className="p-2 border border-gray-300 rounded-r-lg w-full"
                    />
                  </div>
                  {errors.landline && (
                    <p className="text-red-500 text-sm">{errors.landline}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Mobile Number<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder="Enter Your Mobile Number"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {/* {errors.mobile_number && (
                    <p className="text-red-500 text-sm">
                      {errors.mobile_number}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-start">
                  <div className="flex gap-3">
                    <label className="p-2 text-nowrap">
                      Principal Name
                      <span className="text-red-500 text-lg">*</span>
                    </label>
                  </div>
                  <div className="flex">
                    <select
                      name="principal_name_prefix"
                      value={formData.principal_name_prefix}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-l-lg">
                      <option value="" disabled>
                        Prefix
                      </option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>

                    <input
                      type="text"
                      name="principal_name"
                      value={formData.principal_name}
                      onChange={handleChange}
                      placeholder="Enter Principal Name"
                      className="p-2 border border-gray-300 rounded-r-lg w-full"
                    />
                  </div>
                  {errors.principal_name && (
                    <p className="text-red-500 text-sm">
                      {errors.principal_name}
                    </p>
                  )}
                </div>
                <div className="relative flex flex-col">
                  <label className="text-left p-2">
                    Syllabus<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}>
                    <option value="" disabled>
                      Select Syllabus
                    </option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State">State</option>
                  </select>
                  {errors.syllabus && (
                    <p className="text-red-500 text-sm">{errors.syllabus}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 py-3 rounded-xl bg-[#ED1450] text-white font-semibold w-full">
                Submit
              </button>
            </form>
            {statusMessage && (
              <p className="text-center mt-4 text-red-500">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
