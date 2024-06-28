import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import img from "../../image/user (1).png";
import img1 from "../../../assets/Frontend_images/logo.png";

const SubHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const menuRef = useRef(null);
  const [submenuType, setSubmenuType] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [isLogined, setIsLogined] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!(token || email)) {
      setIsLogined("Logout");
    } else {
      setIsLogined("Login");
    }
  }, []);

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

  const handleOpen = () => {
    setShowNav(!showNav);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && showNav) {
      setShowNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNav]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowNav(false);
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubMenuOpen = (event, type) => {
    setSubmenuAnchorEl(event.currentTarget);
    setSubmenuType(type);
  };

  const handleSubMenuClose = () => {
    setSubmenuAnchorEl(null);
    setSubmenuType(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setIsLogined("Logout");
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

          <div
            className={`flex flex-col lg:flex-row lg:p-3 lg:justify-between items-center lg:space-x-8 w-44 z-10 lg:w-auto bg-white absolute lg:mt-0 mt-12 right-0 lg:static justify-center ${
              showNav ? "" : "hidden"
            } lg:flex`}>
            <div className="lg:flex lg:flex-row flex items-center lg:space-y-3 lg:space-x-5">
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
                <Popper
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  role={undefined}
                  transition
                  disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleDropdownClose}>
                          <MenuList
                            autoFocusItem={Boolean(anchorEl)}
                            id="exam-details-menu">
                            <MenuItem
                              onClick={(event) =>
                                handleSubMenuOpen(event, "mtso")
                              }>
                              (MTSO) Mathematics Talent Search Olympiad
                              <ArrowRightIcon />
                            </MenuItem>
                            <Popper
                              open={submenuType === "mtso"}
                              anchorEl={anchorEl}
                              placement="bottom-start"
                              transition
                              modifiers={{
                                flip: {
                                  enabled: true,
                                },
                                preventOverflow: {
                                  enabled: true,
                                  boundariesElement: "viewport",
                                },
                              }}
                              style={{ zIndex: 1300 }}>
                              {({ TransitionProps }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{ transformOrigin: "left top" }}>
                                  <Paper>
                                    <ClickAwayListener
                                      onClickAway={handleSubMenuClose}>
                                      <MenuList>
                                        <Link to="/mtso_about">
                                          <MenuItem
                                            onClick={() => {
                                              handleSubMenuClose();
                                              handleDropdownClose();
                                              setShowNav(false);
                                            }}>
                                            (MTSO)About
                                          </MenuItem>
                                        </Link>
                                        <MenuItem onClick={handleSubMenuClose}>
                                          (MTSO)Syllabus&Pattern
                                        </MenuItem>
                                      </MenuList>
                                    </ClickAwayListener>
                                  </Paper>
                                </Grow>
                              )}
                            </Popper>

                            <MenuItem
                              onClick={(event) =>
                                handleSubMenuOpen(event, "atso")
                              }>
                              (ATSO) Aptitude Talent Search Olympiad{" "}
                              <ArrowRightIcon />
                            </MenuItem>
                            <Popper
                              open={submenuType === "atso"}
                              anchorEl={anchorEl}
                              placement="bottom-start"
                              transition
                              modifiers={{
                                flip: {
                                  enabled: true,
                                },
                                preventOverflow: {
                                  enabled: true,
                                  boundariesElement: "viewport",
                                },
                              }}
                              style={{ zIndex: 1300 }}>
                              {({ TransitionProps }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{ transformOrigin: "left top" }}>
                                  <Paper>
                                    <ClickAwayListener
                                      onClickAway={handleSubMenuClose}>
                                      <MenuList>
                                        <MenuItem onClick={handleSubMenuClose}>
                                          (ATSO)About
                                        </MenuItem>
                                        <MenuItem onClick={handleSubMenuClose}>
                                          (ATSO)Syllabus&Pattern
                                        </MenuItem>
                                      </MenuList>
                                    </ClickAwayListener>
                                  </Paper>
                                </Grow>
                              )}
                            </Popper>

                            <MenuItem
                              onClick={(event) =>
                                handleSubMenuOpen(event, "etso")
                              }>
                              (ETSO) English Talent Search Olympiad{" "}
                              <ArrowRightIcon />
                            </MenuItem>
                            <Popper
                              open={submenuType === "etso"}
                              anchorEl={anchorEl}
                              placement="bottom-start"
                              transition
                              modifiers={{
                                flip: {
                                  enabled: true,
                                },
                                preventOverflow: {
                                  enabled: true,
                                  boundariesElement: "viewport",
                                },
                              }}
                              style={{ zIndex: 1300 }}>
                              {({ TransitionProps }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{ transformOrigin: "left top" }}>
                                  <Paper>
                                    <ClickAwayListener
                                      onClickAway={handleSubMenuClose}>
                                      <MenuList>
                                        <MenuItem onClick={handleSubMenuClose}>
                                          (ETSO)About
                                        </MenuItem>
                                        <MenuItem onClick={handleSubMenuClose}>
                                          (ETSO)Syllabus&Pattern
                                        </MenuItem>
                                      </MenuList>
                                    </ClickAwayListener>
                                  </Paper>
                                </Grow>
                              )}
                            </Popper>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

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
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
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
                    mt: { xs: 0, sm: 0, lg: 0 },
                    ml: { xs: 0, sm: 5, lg: 10 },
                    mr: { xs: 0, sm: 5 },
                  }}>
                  <Link to="/userprofile">
                    <MenuItem onClick={handleProfileMenuClose}>
                      Profile
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={() => navigate("/mycontent")}>
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
    </>
  );
};

export default SubHeader;
