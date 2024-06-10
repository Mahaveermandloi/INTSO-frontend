import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import AboutUsPage from "../AboutUs/AboutUsPage";
import Knowledge from "../Knowledge/Knowledge";
import { Main } from "../Home/Main";
import MainBlog from "../Blog/MainBlog";

import ContactUs from "../Contact/ContactUs";
import Login from "../Login/Login";
import { Button, Modal, Menu, MenuItem } from "@mui/material";
import { GalleryPage } from "../Gallery/GalleryPage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MTSOAbout from "../ExamDetails/MTSOAbout";

const SubHeader = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeButton, setActiveButton] = useState("Home");
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scheduleAnchorEl, setScheduleAnchorEl] = useState(null);
  const [syllabusAnchorEl, setSyllabusAnchorEl] = useState(null);
  const [resultsAnchorEl, setResultsAnchorEl] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
    hide();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowNav(!showNav);
  };
  const hide = () => {
    setShowNav(false);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    hide();
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuOpen = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleSubMenuClose = (setter) => () => {
    setter(null);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "Home":
        return <Main />;
      case "Aboutus":
        return <AboutUsPage />;
      case "Knowledge":
        return <Knowledge />;
      case "Blog":
        return <MainBlog />;
      case "Examdetails":
        return <MTSOAbout />;
      case "Gallery":
        return <GalleryPage />;
      case "ContactUs":
        return <ContactUs />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white w-full sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex justify-between lg:px-20 px-10">
          <div className="flex justify-between p-3 w-full lg:w-auto">
            <div>
              <img
                src="https://intso.co.in/wp-content/uploads/2023/06/logo-2.png"
                className="lg:w-64 w-28"
              />
            </div>
            <div className="lg:hidden">
              <button onClick={handleOpen}>
                <MenuIcon />
              </button>
            </div>
          </div>

          <div className="flex lg:p-3 lg:justify-between items-center lg:space-x-8 w-44 z-10 lg:w-auto bg-white absolute lg:mt-0 mt-12 right-0 lg:static justify-center">
            <div
              className={`lg:flex lg:space-x-8 ${
                showNav ? "" : "hidden"
              } flex-col lg:flex-row p-3`}
            >
              <div className="lg:flex lg:flex-row flex items-center lg:space-y-3 lg:space-x-5">
                <ul className="flex lg:flex-row flex-col justify-center items-start gap-2 lg:h-auto lg:gap-4 text-base font-semibold h-56">
                  <Link to="/">
                    <li
                      className={`text-nowrap ${
                        activeButton === "Home"
                          ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
                          : ""
                      }`}
                      onClick={() => handleButtonClick("Home")}
                    >
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
                      onClick={() => handleButtonClick("Aboutus")}
                    >
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
                      onClick={() => handleButtonClick("Knowledge")}
                    >
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
                    aria-haspopup="true"
                  >
                    Exam Details <ArrowDropDownIcon />
                  </li>
                  <Menu
                    id="exam-details-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleDropdownClose}
                    keepMounted
                  >
                    <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
                      (MTSO) Mathematics Talent Search Olympiad
                      <ArrowRightIcon />
                    </MenuItem>
                    <Menu
                      anchorEl={scheduleAnchorEl}
                      open={Boolean(scheduleAnchorEl)}
                      onClose={handleSubMenuClose(setScheduleAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <Link to="/mtso_about">
                        <MenuItem
                          onClick={handleSubMenuClose(setScheduleAnchorEl)}
                        >
                          (MTSO)About
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={handleSubMenuClose(setScheduleAnchorEl)}
                      >
                        (MTSO)Syllabus&Pattern
                      </MenuItem>
                    </Menu>
                    <MenuItem onClick={handleSubMenuOpen(setSyllabusAnchorEl)}>
                      (ATSO) Aptitude Talent Search Olympiad <ArrowRightIcon />
                    </MenuItem>
                    <Menu
                      anchorEl={syllabusAnchorEl}
                      open={Boolean(syllabusAnchorEl)}
                      onClose={handleSubMenuClose(setSyllabusAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (ATSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (MATSO)Syllabus&Pattern
                      </MenuItem>
                    </Menu>
                    <MenuItem onClick={handleSubMenuOpen(setResultsAnchorEl)}>
                      (ETSO) English Talent Search Olympiad <ArrowRightIcon />
                    </MenuItem>
                    <Menu
                      anchorEl={resultsAnchorEl}
                      open={Boolean(resultsAnchorEl)}
                      onClose={handleSubMenuClose(setResultsAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <MenuItem
                        onClick={handleSubMenuClose(setResultsAnchorEl)}
                      >
                        (ETSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setResultsAnchorEl)}
                      >
                        (ETSO)Syllabus&Pattern
                      </MenuItem>
                    </Menu>
                    <MenuItem onClick={handleSubMenuOpen(setSyllabusAnchorEl)}>
                      (STSO) Aptitude Talent Search Olympiad <ArrowRightIcon />
                    </MenuItem>
                    <Menu
                      anchorEl={syllabusAnchorEl}
                      open={Boolean(syllabusAnchorEl)}
                      onClose={handleSubMenuClose(setSyllabusAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (STSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (STSO)Syllabus&Pattern
                      </MenuItem>
                    </Menu>
                    <MenuItem onClick={handleSubMenuOpen(setSyllabusAnchorEl)}>
                      (GTSO) Aptitude Talent Search Olympiad <ArrowRightIcon />
                    </MenuItem>
                    <Menu
                      anchorEl={syllabusAnchorEl}
                      open={Boolean(syllabusAnchorEl)}
                      onClose={handleSubMenuClose(setSyllabusAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (GTSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}
                      >
                        (GTSO)Syllabus&Pattern
                      </MenuItem>
                    </Menu>
                  </Menu>
                  <Link to="/blogs">
                    <li
                      className={`text-nowrap ${
                        activeButton === "Blog"
                          ? "underline decoration-[#ED1450] underline-offset-4 text-[#ED1450]"
                          : ""
                      }`}
                      onClick={() => handleButtonClick("Blog")}
                    >
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
                      onClick={() => handleButtonClick("Gallery")}
                    >
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
                      onClick={() => handleButtonClick("ContactUs")}
                    >
                      Contact Us
                    </li>
                  </Link>
                </ul>
              </div>

              <Link to="/login">
                <button
                  className="bg-[#ED1450] px-8 p-2 rounded-full font-bold text-lg text-white"
                  onClick={handleOpenModal}
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
