import React from "react";
import ATSOSyllabus from "./ATSOSyllabus";
import ATSOLevel from "./ATSOLevel";
import ATSOPattern from "./ATSOPattern";
import ATSOClasses from "./ATSOClasses";

const ATSO = () => {
  return (
    <>
      <div>
        <ATSOSyllabus />
        <ATSOLevel />
        <ATSOPattern />
        <ATSOClasses />
      </div>
    </>
  );
};

export default ATSO;
