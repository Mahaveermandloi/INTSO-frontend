// DropdownMenu.js
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";

const DropdownMenu = ({
  anchorEl,
  open,
  onClose,
  setScheduleAnchorEl,
  handleSubMenuOpen,
  handleSubMenuClose,
  scheduleAnchorEl,
  syllabusAnchorEl,
  setSyllabusAnchorEl,
  resultsAnchorEl,
  setResultsAnchorEl,
}) => {
  return (
    <Menu
      id="exam-details-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      keepMounted>
      <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
        (MTSO) Mathematics Talent Search Olympiad <ArrowRightIcon />
      </MenuItem>
      <Menu
        anchorEl={setScheduleAnchorEl}
        open={Boolean(setScheduleAnchorEl)}
        onClose={handleSubMenuClose(setScheduleAnchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <Link to="/mtso_about">
          <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
            (MTSO) About
          </MenuItem>
        </Link>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (MTSO) Syllabus & Pattern
        </MenuItem>
      </Menu>

      <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
        (ATSO) Aptitude Talent Search Olympiad <ArrowRightIcon />
      </MenuItem>
      <Menu
        anchorEl={setScheduleAnchorEl}
        open={Boolean(setScheduleAnchorEl)}
        onClose={handleSubMenuClose(setScheduleAnchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (ATSO) About
        </MenuItem>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (ATSO) Syllabus & Pattern
        </MenuItem>
      </Menu>

      <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
        (ETSO) English Talent Search Olympiad <ArrowRightIcon />
      </MenuItem>
      <Menu
        anchorEl={setScheduleAnchorEl}
        open={Boolean(setScheduleAnchorEl)}
        onClose={handleSubMenuClose(setScheduleAnchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (ETSO) About
        </MenuItem>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (ETSO) Syllabus & Pattern
        </MenuItem>
      </Menu>

      <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
        (STSO) Science Talent Search Olympiad <ArrowRightIcon />
      </MenuItem>
      <Menu
        anchorEl={setScheduleAnchorEl}
        open={Boolean(setScheduleAnchorEl)}
        onClose={handleSubMenuClose(setScheduleAnchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (STSO) About
        </MenuItem>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (STSO) Syllabus & Pattern
        </MenuItem>
      </Menu>

      <MenuItem onClick={handleSubMenuOpen(setScheduleAnchorEl)}>
        (GTSO) General Talent Search Olympiad <ArrowRightIcon />
      </MenuItem>
      <Menu
        anchorEl={setScheduleAnchorEl}
        open={Boolean(setScheduleAnchorEl)}
        onClose={handleSubMenuClose(setScheduleAnchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (GTSO) About
        </MenuItem>
        <MenuItem onClick={handleSubMenuClose(setScheduleAnchorEl)}>
          (GTSO) Syllabus & Pattern
        </MenuItem>
      </Menu>
    </Menu>
  );
};

export default DropdownMenu;
