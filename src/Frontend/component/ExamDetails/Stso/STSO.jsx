import React from "react";
import STSOLevel from "./STSOLevel";
import STSOPattern from "./STSOPattern";
import STSOClasses from "./STSOClasses";
import STSOSyllabus from "./STSOSyllabus";
const STSO = () => {
  return (
    <>
      <div>
        <STSOSyllabus />
        <STSOLevel />
        <STSOPattern />
        <STSOClasses />
      </div>
    </>
  );
};

export default STSO;
