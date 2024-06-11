import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
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
      if (res.ok) {
        const data = await res.json();
        console.log("Response data:", data);
        setStatusMessage("Your message has been sent successfully!");
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
      } else {
        const errorData = await res.json();
        console.error("Failed to send message:", errorData);
        setStatusMessage("Failed to send your message. Please try again.");
      }
    } catch (err) {
      console.error("Sending message failed:", err);
      setStatusMessage("An error occurred. Please try again later.");
    }
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
              onSubmit={handleSubmit}
            >
              <div className="grid gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    School Name<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="Enter Your school name"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Email<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email.ID"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label className="text-left p-2">
                    School Address
                    <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your school Address"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    City<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter Your City"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                </div>
                <div className="relative flex flex-col">
                  <label className="text-left p-2">
                    State<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Your State
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    District<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter Your District"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Pin Code<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Your Pin code"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
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
                      required
                      name="STD_code"
                      value={formData.STD_code}
                      onChange={handleChange}
                      placeholder="STD Code"
                      className="p-2 border border-gray-300 rounded-l-lg max-w-24"
                    />
                    <input
                      type="text"
                      required
                      name="landline"
                      value={formData.landline}
                      onChange={handleChange}
                      placeholder="Enter Landline Number"
                      className="p-2 border border-gray-300 rounded-r-lg w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Mobile Number<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder="Enter Your Mobile Number"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
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
                      className="p-2 border border-gray-300 rounded-l-lg"
                    >
                      <option value="" disabled>
                        Prefix
                      </option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>
                    <input
                      type="text"
                      required
                      name="principal_name"
                      value={formData.principal_name}
                      onChange={handleChange}
                      placeholder="Enter Principal Name"
                      className="p-2 border border-gray-300 rounded-r-lg w-full"
                    />
                  </div>
                </div>
                <div className="relative flex flex-col">
                  <label className="text-left p-2">
                    Syllabus<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Syllabus
                    </option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State">State</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 py-3 rounded-xl bg-[#ED1450] text-white font-semibold w-full"
              >
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
