import { BiBookContent } from "react-icons/bi";
import { RiArticleLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminFooter from "../Components/AdminFooter";

import { PiFlagBannerFold } from "react-icons/pi";
import {
  FaHome,
  FaImages,
  FaNewspaper,
  FaQuoteLeft,
  FaSignOutAlt,
  FaChevronDown,
  FaDoorOpen,
  FaMedal,
} from "react-icons/fa";
// import { LiaMedalSolid } from "react-icons/lia";
import { baseURL } from "../URLPath";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  // Detect screen width on component mount
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = () => {
    if (isMobileScreen) {
      toggleSidebar(); // Close sidebar on mobile after item click
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  const toggleDropdown4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  };

  return (
    <>
      {isOpen && isMobileScreen && (
        <div
          className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed flex flex-col top-22 left-0 h-[calc(100vh-4rem)] lg:w-1/6 z-50 bg-gray-800 text-white p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="overflow-y-auto h-full custom-scrollbar">
          <ul>
            <Link onClick={handleItemClick} to={`${baseURL}/dashboard`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaHome className="mr-2" />
                Dashboard
              </li>
            </Link>
            <Link onClick={handleItemClick} to={`${baseURL}/gallery`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaImages className="mr-2" />
                Gallery
              </li>
            </Link>
            <Link
              onClick={handleItemClick}
              to={`${baseURL}/reward-recognition`}
            >
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                {/* <FaImages className="mr-2" /> */}
                <FaMedal className="mr-2" />
                Reward
              </li>
            </Link>
            <Link onClick={handleItemClick} to={`${baseURL}/banner`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <PiFlagBannerFold className="mr-2" />
                Banner
              </li>
            </Link>
            <li
              className={`${
                isDropdownOpen ? "" : "mb-4"
              } flex justify-between items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded`}
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                <BiBookContent className="mr-2" />
                Content
              </div>
              <FaChevronDown size={20} />
            </li>
            <ul
              className={`ml-6 space-y-2 transition-all duration-500 ${
                isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <Link onClick={handleItemClick} to={`${baseURL}/image`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  Image
                </li>
              </Link>
              <Link onClick={handleItemClick} to={`${baseURL}/video`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  Video
                </li>
              </Link>
              <Link onClick={handleItemClick} to={`${baseURL}/pdf`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  PDF
                </li>
              </Link>
            </ul>

            <li
              className={`${
                isDropdownOpen2 ? "" : "mb-4"
              } flex justify-between items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded`}
              onClick={toggleDropdown2}
            >
              <div className="flex items-center">
                <BiBookContent className="mr-2" />
                Student
              </div>
              <FaChevronDown size={20} />
            </li>
            <ul
              className={`ml-6 space-y-2 transition-all duration-500 ${
                isDropdownOpen2 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <Link onClick={handleItemClick} to={`${baseURL}/studentrequest`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  Student Request
                </li>
              </Link>
              <Link onClick={handleItemClick} to={`${baseURL}/studentlist`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  Student List
                </li>
              </Link>
              <Link onClick={handleItemClick} to={`${baseURL}/uploadstudent`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  Upload Students
                </li>
              </Link>
            </ul>
            <li
              className={`${
                isDropdownOpen3 ? "" : "mb-4"
              } flex justify-between items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded`}
              onClick={toggleDropdown3}
            >
              <div className="flex items-center">
                <BiBookContent className="mr-2" />
                School
              </div>
              <FaChevronDown size={20} />
            </li>
            <ul
              className={`ml-6 space-y-2 transition-all duration-500 ${
                isDropdownOpen3 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <Link onClick={handleItemClick} to={`${baseURL}/schoolrequests`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  School Requests
                </li>
              </Link>
              <Link onClick={handleItemClick} to={`${baseURL}/schoollist`}>
                <li className="flex items-center cursor-pointer text-xl hover:bg-gray-700 p-2 rounded">
                  School List
                </li>
              </Link>
            </ul>

            <Link onClick={handleItemClick} to={`${baseURL}/blog`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <RiArticleLine className="mr-2" />
                Blogs
              </li>
            </Link>

            <Link onClick={handleItemClick} to={`${baseURL}/newsandupdates`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaNewspaper className="mr-2" />
                News & Updates
              </li>
            </Link>
            <Link onClick={handleItemClick} to={`${baseURL}/question-ans`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaNewspaper className="mr-2" />
                Q&A
              </li>
            </Link>
            <Link onClick={handleItemClick} to={`${baseURL}/testimonials`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaQuoteLeft className="mr-2" />
                Testimonials
              </li>
            </Link>

            <Link onClick={handleItemClick} to={`${baseURL}/newsletter`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <RiArticleLine className="mr-2" />
                News Letter
              </li>
            </Link>
            <Link onClick={handleItemClick} to={`${baseURL}/careerList`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <FaDoorOpen className="mr-2" />
                Career With Us
              </li>
            </Link>

            <Link onClick={handleItemClick} to={`${baseURL}/contactus`}>
              <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                <RiArticleLine className="mr-2" />
                Contact Us
              </li>
            </Link>

            {!isMobileScreen && ( // Only show Logout on desktop screens
              <Link
                to={`${baseURL}/login`}
                onClick={() => {
                  handleItemClick();
                  localStorage.removeItem("accessToken");
                  window.location.reload(); //
                }}
              >
                <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-700 p-2 rounded">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </li>
              </Link>
            )}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0; /* Remove scrollbar space */
          background: transparent; /* Optional: just make scrollbar invisible */
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
};

export default SideBar;
