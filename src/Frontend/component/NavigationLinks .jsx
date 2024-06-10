// NavigationLinks.js
import React from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropdownMenu from "./DropdownMenu ";

const NavigationLinks = ({
  activeButton,
  handleButtonClick,
  handleDropdownOpen,
  anchorEl,
  handleDropdownClose,
  handleSubMenuOpen,
  handleSubMenuClose,
  setScheduleAnchorEl,
  scheduleAnchorEl,
  syllabusAnchorEl,
  setSyllabusAnchorEl,
  resultsAnchorEl,
  setResultsAnchorEl,
}) => {
  return (
    <ul className="flex lg:flex-row flex-col justify-center items-start gap-2 lg:h-auto lg:gap-4 text-base font-semibold h-56">
      <Link to="/">
        <li
          className={`text-nowrap ${
            activeButton === "Home"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("Home")}>
          Home
        </li>
      </Link>
      <Link to="/aboutus">
        <li
          className={`text-nowrap ${
            activeButton === "Aboutus"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("Aboutus")}>
          About Us
        </li>
      </Link>
      <Link to="/knowledge">
        <li
          className={`text-nowrap ${
            activeButton === "Knowledge"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("Knowledge")}>
          Knowledge Desk
        </li>
      </Link>
      <li
        className={`text-nowrap ${
          activeButton === "Examdetails"
            ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
            : ""
        }`}
        onClick={handleDropdownOpen}
        aria-controls="exam-details-menu"
        aria-haspopup="true">
        Exam Details <ArrowDropDownIcon />
      </li>
      <DropdownMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        setScheduleAnchorEl={setScheduleAnchorEl}
        handleSubMenuOpen={handleSubMenuOpen}
        handleSubMenuClose={handleSubMenuClose}
        scheduleAnchorEl={scheduleAnchorEl}
      />
      <Link to="/blogs">
        <li
          className={`text-nowrap ${
            activeButton === "Blog"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("Blog")}>
          Blogs
        </li>
      </Link>
      <Link to="/gallery">
        <li
          className={`text-nowrap ${
            activeButton === "Gallery"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("Gallery")}>
          Gallery
        </li>
      </Link>
      <Link to="/contactUs">
        <li
          className={`text-nowrap ${
            activeButton === "ContactUs"
              ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
              : ""
          }`}
          onClick={() => handleButtonClick("ContactUs")}>
          Contact Us
        </li>
      </Link>
    </ul>
  );
};

export default NavigationLinks;
