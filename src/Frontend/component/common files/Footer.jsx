import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <footer className="">
        <div className="max-w-screen-xl mx-auto lg:px-24 px-6 p-4">
          <div className=" grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ">
            <div className="space-y-6 lg:border-r-2 border-gray-20 p-5 ">
              <img
                src="https://intso.co.in/wp-content/uploads/2023/06/logo-2.png"
                class="h-12 me-3"
                alt="intso Logo"
              />
              <p className=" text-left text-gray-500">
                INTSO is an Educational Organization popularizing academic
                competition and assisting development of competitive spirit
                among school children.
              </p>
            </div>

            <div className="flex sm:items-center items-start flex-col text-left lg:border-r-2 border-gray-20 p-5">
              <div>
                <h1 className="text-[#ED1450] py-3  font-bold text-2xl">
                  Quick Links
                </h1>
                <ul className="flex flex-col space-y-2 text-gray-600">
                  <Link to="/register">
                    <li className="hover:underline ">School Registration</li>
                  </Link>
                  <Link to="/studentregister">
                    <li className="hover:underline ">Student Registration </li>
                  </Link>
                  <Link to="/login">
                    <li className="hover:underline ">Login</li>
                  </Link>
                  <Link to="/rewards">
                    <li className="hover:underline ">
                      Rewards And Recognition
                    </li>
                  </Link>
                  <Link to="/career">
                    <li className="hover:underline ">Career With Us</li>
                  </Link>
                  <Link to="/achivercorner">
                    <li className="hover:underline ">Achiver Corner</li>
                  </Link>
                  <Link to="/faq">
                    <li className="hover:underline ">FAQ</li>
                  </Link>
                  <Link to="/hotlinks">
                    <li className="hover:underline ">Hotlinks</li>
                  </Link>
                </ul>
              </div>
            </div>

            <div className="flex sm:items-center items-start flex-col text-left  lg:border-r-2 border-gray-20 p-5">
              <div>
                <h1 className="text-[#ED1450] py-3 font-bold text-2xl ">
                  Quick Links
                </h1>
                <ul className=" text-gray-600">
                  <Link to="/aboutus">
                    <li className="hover:underline ">
                      <a>About</a>
                    </li>
                  </Link>
                  <Link to="/knowledge">
                    <li className="hover:underline mt-2">
                      <a>Knowledge Desk</a>
                    </li>
                  </Link>
                  <Link>
                    <li className="hover:underline mt-2">
                      <a>Exam Details</a>
                    </li>
                  </Link>
                  <Link to="/gallery">
                    <li className="hover:underline mt-2">
                      <a>Gallery</a>
                    </li>
                  </Link>
                  <Link to="/testimonials">
                    <li className="hover:underline mt-2">
                      <a>Testimonials</a>
                    </li>
                  </Link>
                  <Link to="/">
                    <li className="hover:underline mt-2">
                      <a>Become a Co-ordinater</a>
                    </li>
                  </Link>
                  <Link to="/content">
                    <li className="hover:underline mt-2">
                      <a>Content</a>
                    </li>
                  </Link>
                  <Link to="/membership">
                    <li className="hover:underline mt-2">
                      <a>Memberships Associations & Certification</a>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="flex sm:items-center items-start flex-col text-left p-5">
              <div>
                <h1 className="text-[#ED1450] py-3 font-bold text-2xl">
                  Contact Us
                </h1>
                <ul className="space-y-2 text-gray-600">
                  <li class="flex gap-5">
                    <LocationOnIcon className="rounded-full bg-[#ED1450] text-white p-1 " />
                    <a>
                      31-4-3, Chuttugunta, Maruthi Nagar,Vijayawada-520002
                      Andhra Pradesh
                    </a>
                  </li>
                  <li class="flex gap-5">
                    <CallIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                    <a>+91 9248 922 777</a>
                  </li>
                  <li class="flex gap-5">
                    <EmailIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                    <a>info@intso.co.in</a>
                  </li>
                  <li className="space-x-4">
                    <FacebookIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                    <TwitterIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                    <InstagramIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                    <LinkedInIcon className="rounded-full bg-[#ED1450] text-white p-1 text-xl md:text-4xl" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#141833] sm:flex sm:items-center mt-5 sm:justify-center">
          <span class="text-sm text-gray-400 sm:text-center dark:text-gray-400 p-3">
            Copyright {currentYear} | Design & Developed By: Ozonesoft Solutions
          </span>
        </div>
      </footer>
    </>
  );
};
