import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../../../src/assets/Frontend_images/Contact Vector.png";

const ContactUs = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    message: "",
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
        `http://${IP_ADDRESS}:${PORT}/api/v1/contact/postContact`,
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
          message: "",
        });
      } else if (res.status === 400) {
        toast.error("please fill the all required fields");
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (err) {
      console.error("Sending message failed:", err);
      setStatusMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <ToastContainer />
      <div className=" bg-gray-100 lg:px-4 px-10 py-8">
        <div>
          <div className="lg:px-24 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <img src={img1} alt="Contact" />
              <h1 className="text-4xl font-bold text-[#ED1450]">
                Get in Touch With Us
              </h1>
              <p className="font-semibold">
                Olympiad exams are academic competitions designed to challenge.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
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
              </div>
              <div className="grid grid-cols-1 mt-4">
                <label className="text-left p-2">
                  Message<span className="text-red-500 text-lg">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 px-4 rounded-lg"
                  placeholder="Type Message"></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="lg:col-span-2 w-[40%] bg-[#ED1450] text-white text-lg p-3 rounded-full mt-10">
                  Register
                </button>
              </div>
              {statusMessage && (
                <p className="text-center mt-4 text-red-500">{statusMessage}</p>
              )}
            </form>
            <div className="bg-white mt-10 grid sm:grid-cols-3 grid-cols-1 gap-8 p-4 rounded-md ">
              <div className="flex gap-5 items-center">
                <LocationOnIcon
                  className="rounded-full bg-[#ED1450] text-white p-1 text-6xl"
                  style={{ fontSize: "3rem" }}
                />
                <a>
                  31-4-3, Chuttugunta, Maruthi Nagar, Vijayawada-520002 Andhra
                  Pradesh
                </a>
              </div>
              <div className="flex gap-5 items-center">
                <CallIcon
                  className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl"
                  style={{ fontSize: "3rem" }}
                />
                <a>+91 9248 922 777</a>
              </div>
              <div className="flex gap-5 items-center">
                <EmailIcon
                  className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl"
                  style={{ fontSize: "3rem" }}
                />
                <a>info@intso.co.in</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 relative w-full">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.912134769486!2d-122.08424908469205!3d37.42206597982592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5e4a0e6df5f%3A0x551d98e56b7b48c8!2sGoogleplex!5e0!3m2!1sen!2sus!4v1580123456789!5m2!1sen!2sus"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
