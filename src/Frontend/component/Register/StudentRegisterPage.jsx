import React, { useEffect, useState } from "react";
import "./register.module.css";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import img from "../../../../src/assets/Frontend_images/Regitration_Graphics.png";
import useFormValidation from "../utils/hooks/useFormValidation";

const StudentRegisterPage = () => {
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile_number: "",
    syllabus: "",
    school_name: "",
    student_class: "",
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
          `http://${IP_ADDRESS}:${PORT}/api/v1/student/createStudent`,
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
          setStatusMessage("Your message has been sent successfully!");
          setFormData({
            name: "",
            email: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            mobile_number: "",
            syllabus: "",
            school_name: "",
            student_class: "",
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
    } else {
      setStatusMessage("Please correct the errors and try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const classes = ["1", "2", "3", "4 ", "5", " 6", " 7", "8", " 9", "10"];

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
      <div className=" shadow-inner shadow-gray-300 mb-10" data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
          <div className=" sm:mx-20 mx-5 shadow-xl">
            <div className=" flex flex-col py-7 justify-center items-center ">
              <h1 className="text-[#ED1450] font-bold text-2xl ">
                Student Registration Form
              </h1>
              <p className="w-20 border-b-2 border-[#ED1450]"></p>
              <img src={img} className="mt-10" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:px-10 p-6">
              <div className="grid gap-x-4 gap-y-2  ">
                <div className="flex flex-col ">
                  <label className="text-left p-2">
                    Student Name<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {/* {errors.student_name && (
                    <p className="text-red-500 text-sm">
                      {errors.student_name}
                    </p>
                  )} */}
                </div>
                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Email<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
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
                <div className="flex flex-col ">
                  <label className="text-left p-2">
                    School Name<span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className="border border-gray-300 p-2 px-4 rounded-lg"
                  />
                  {errors.school_name && (
                    <p className="text-red-500 text-sm">{errors.school_name}</p>
                  )}
                </div>
                <div class="relative flex flex-col">
                  <label className="text-left p-2">
                    Class<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="student_class"
                    value={formData.student_class}
                    onChange={handleChange}>
                    <option disabled selected>
                      Select Your class
                    </option>
                    {classes.map((cls) => (
                      <option key={cls} value={parseInt(cls, 10)}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label className="text-left p-2">
                    Address
                    <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter student Address"
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
                <div class="relative flex flex-col">
                  <label className="text-left p-2">
                    State<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 px-4 rounded-lg"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}>
                    <option disabled selected>
                      Select Your State
                    </option>
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
              </div>
              <div className="grid grid-cols-2 gap-x-4 ">
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
                  {errors.mobile_number && (
                    <p className="text-red-500 text-sm">
                      {errors.mobile_number}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-left p-2">
                    Syllabus<span className="text-red-500 text-lg">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-3 rounded-lg"
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}>
                    <option disabled selected>
                      Select Syllabus
                    </option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="lg:col-span-2 w-[40%] bg-[#ED1450] text-white text-lg p-3 rounded-full mt-10">
                  Register
                </button>
              </div>
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

export default StudentRegisterPage;
