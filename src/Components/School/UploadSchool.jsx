import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Frontend_images/Regitration_Graphics.png";
import { URLPath } from "../../URLPath";
const UploadSchool = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

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
    status: "approved",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const response = await axios.post(
  //       `${URLPath}/api/v1/school/uploadSchool`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("School registered successfully!");
  //       setTimeout(() => {
  //         navigate("/admin/schoollist");
  //       }, 2000);
  //     } else {
  //       toast.error("Failed to register school. Please try again.");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       const { status, data } = error.response;
  //       if (status === 400) {
  //         toast.error(data.message || "Bad Data!");
  //       } else if (status === 409) {
  //         toast.error("School with this email is already registered.");
  //       } else {
  //         toast.error("Failed to register school. Please try again.");
  //       }
  //     } else {
  //       toast.error("Network error. Please try again later.");
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    // Validate mobile number format (must be exactly 10 digits)
    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(formData.mobile_number)) {
      toast.error("Mobile number must be exactly 10 digits long");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${URLPath}/api/v1/school/uploadSchool`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("School registered successfully!");
        setTimeout(() => {
          navigate("/admin/schoollist");
        }, 2000);
      } else {
        toast.error("Failed to register school. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.message || "Bad Data!");
        } else if (status === 409) {
          toast.error("School with this email is already registered.");
        } else {
          toast.error("Failed to register school. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <div className="shadow-inner  mb-20">
          <div className="  ">
            <div className="sm:mx-20  shadow-xl">
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
                  </div>
                  <div className="flex flex-col">
                    <label className="text-left p-2">
                      Mobile Number
                      <span className="text-red-500 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="Enter Your Mobile Number"
                      className="border border-gray-300 p-2 px-4 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-x-4 gap-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSchool;
