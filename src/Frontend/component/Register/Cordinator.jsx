import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cordinator = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    remark: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/co-ordinator/post-co-ordinator`,
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
          name: "",
          email: "",
          mobile_number: "",
          remark: "",
        });
      } else if (res.status === 409) {
        toast.error("This email is already registered.");
      } else if (res.status === 400) {
        const responseData = await res.json();
        if (
          responseData.message &&
          responseData.message.includes(
            "Mobile number must be exactly 10 digits long"
          )
        ) {
          toast.error("Mobile number must be exactly 10 digits long");
        } else {
          toast.error(
            responseData.message || "Please fill in all required fields."
          );
        }
      } else {
        toast.error("Failed to send your meassage. Please try again.");
      }
    } catch (err) {
      console.error("Sending message failed:", err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <ToastContainer />
      <div className="lg:px-24 max-w-screen-xl mx-auto">
        <div className="flex flex-col py-7 justify-center items-center mt-10">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Become a Co-ordinatore
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-left p-2">
                Name<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your name"
                className="border border-gray-300 p-2 px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left p-2">
                Email ID<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your EmailID"
                className="border border-gray-300 p-2 px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left p-2">
                Mobile<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
                className="border border-gray-300 p-2 px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left p-2">
                Remark<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="tel"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
                className="border border-gray-300 p-2 px-4 rounded-lg"
              />
            </div>
            {statusMessage && (
              <p className="text-center mt-4 text-red-500">{statusMessage}</p>
            )}
          </div>
          <div className="flex justify-center mb-10">
            <button
              type="submit"
              className="lg:col-span-2  w-fit bg-[#ED1450] text-white text-lg px-6 py-2 rounded-full mt-10">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cordinator;
