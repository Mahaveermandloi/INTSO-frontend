import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import img from "../../../assets/Frontend_images/LoginPage2.png";
import logo from "../../../assets/Frontend_images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IP_ADDRESS } from "../utils/constants";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/user/login`,
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
        const token = data.token;

        localStorage.setItem("token", token);

        setStatusMessage("Your message has been sent successfully!");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/userdashboard");
        window.location.reload();
      } else {
        setStatusMessage("Failed to send your message. Please try again.");
      }
    } catch (err) {
      console.error("Sending message failed:", err);
      setStatusMessage("An error occurred. Please try again later.");
    }
  };

  return (
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label className="text-[#313866]">Email ID</label>
                    <input
                      required
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label className="text-[#313866]">Password</label>
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="border border-[#C5CAD9] p-2 rounded-lg"
                    />
                    {showPassword ? (
                      <VisibilityIcon
                        onClick={toggleIcon}
                        className="absolute right-3 top-8"
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={toggleIcon}
                        className="absolute right-3 top-8"
                      />
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-[#ED1450] text-white p-2 w-full rounded-full"
                    >
                      Login
                    </button>
                  </div>
                  <Link to="/forgotpassword">
                    <p className="underline text-center text-[#ED1450] mt-4">
                      Forgot Your Password?
                    </p>
                  </Link>
                </form>
                {statusMessage && (
                  <p className="text-center mt-4 text-red-500">
                    {statusMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
