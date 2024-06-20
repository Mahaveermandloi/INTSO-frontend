import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import img from "../../image/user (1).png";
import img1 from "../../../assets/Frontend_images/logo.png";

const SubHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scheduleAnchorEl, setScheduleAnchorEl] = useState(null);
  const [syllabusAnchorEl, setSyllabusAnchorEl] = useState(null);
  const [resultsAnchorEl, setResultsAnchorEl] = useState(null);
  const [isLogined, setIsLogined] = useState(""); // Initially empty
  const [showProfileMenu, setShowProfileMenu] = useState(false); // New state for profile menu

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!(token || email)) {
      setIsLogined("Logout"); // Set to "Logout" when no token or email
    } else {
      setIsLogined("Login"); // Set to "Login" when token and email exist
    }

    if (showNav) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNav]);

  useEffect(() => {
    const pathMap = {
      "/": "Home",
      "/aboutus": "Aboutus",
      "/knowledge": "Knowledge",
      "/blogs": "Blog",
      "/gallery": "Gallery",
      "/contactUs": "ContactUs",
    };
    setActiveButton(pathMap[location.pathname] || null);
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleClose();
    }
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

  const handleProfileMenuOpen = (event) => {
    setShowProfileMenu(true);
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

  const handleProfileMenuClose = () => {
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setIsLogined("Logout"); // Set to "Logout" when logging out

    navigate("/");
  };

  return (
    <>
      <div className="bg-white w-full sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex justify-between lg:px-20 px-10">
          <div className="flex justify-between p-3 w-full lg:w-auto">
            <div>
              <img
                src={img1}
                className="lg:w-64 w-28 max-w-full h-auto"
                alt="logo"
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
              } flex-col lg:flex-row p-3`}>
              <div className="lg:flex lg:flex-row flex items-center lg:space-y-3 lg:space-x-5">
                <ul
                  ref={menuRef}
                  className="flex lg:flex-row flex-col justify-center items-start gap-2 lg:h-auto lg:gap-4 text-base font-semibold h-56">
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
                  <Menu
                    id="exam-details-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleDropdownClose}
                    keepMounted>
                    <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
                      (MTSO) Mathematics Talent Search Olympiad
                      <ArrowRightIcon />
                    </MenuItem>

                    <Menu
                      anchorEl={scheduleAnchorEl}
                      open={Boolean(scheduleAnchorEl)}
                      onClose={handleSubMenuClose(setScheduleAnchorEl)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}>
                      <Link to="/mtso_about">
                        <MenuItem
                          onClick={() => {
                            handleSubMenuClose(setScheduleAnchorEl)();
                            handleDropdownClose();
                          }}>
                          (MTSO)About
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={handleSubMenuClose(setScheduleAnchorEl)}>
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
                      transformOrigin={{ vertical: "top", horizontal: "left" }}>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
                        (ATSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
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
                      transformOrigin={{ vertical: "top", horizontal: "left" }}>
                      <MenuItem
                        onClick={handleSubMenuClose(setResultsAnchorEl)}>
                        (ETSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setResultsAnchorEl)}>
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
                      transformOrigin={{ vertical: "top", horizontal: "left" }}>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
                        (STSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
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
                      transformOrigin={{ vertical: "top", horizontal: "left" }}>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
                        (GTSO)About
                      </MenuItem>
                      <MenuItem
                        onClick={handleSubMenuClose(setSyllabusAnchorEl)}>
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
              </div>

              {isLogined === "Login" ? (
                <>
                  <button
                    className="flex justify-center items-center gap-3"
                    onClick={handleProfileMenuOpen}>
                    <img src={img} className="rounded-full w-10" alt="" />
                    <ArrowDropDownIcon />
                  </button>

                  <Menu
                    anchorEl={menuRef.current}
                    open={showProfileMenu}
                    onClose={handleProfileMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    getContentAnchorEl={null}
                    sx={{
                      mt: { xs: 5, sm: 20, lg: 2 },
                      ml: { xs: 0, sm: 10, lg: 16 },
                      mr: { xs: 0, sm: 0 },
                    }}>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={() => navigate("/paidresources")}>
                      My Content
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                ""
              )}

              {isLogined === "Logout" ? (
                <>
                  <button
                    className="bg-[#ED1450] px-8 p-2 rounded-full font-bold text-lg text-white"
                    onClick={() => {
                      navigate("/login");
                      window.location.reload();
                    }}>
                    Login
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, text, activeButton, onClick }) => (
  <li>
    <Link
      to={to}
      className={`px-2 py-1 block text-sm rounded focus:outline-none ${
        activeButton === text ? "text-[#ED1450]" : ""
      }`}
      onClick={onClick}>
      {text}
    </Link>
  </li>
);

const SubMenu = ({ text, to, onClick }) => (
  <MenuItem onClick={onClick}>
    <Link
      to={to}
      className="block px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none">
      {text}
    </Link>
  </MenuItem>
);

export default SubHeader;
