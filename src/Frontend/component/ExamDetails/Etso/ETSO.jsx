import React from "react";
import ETSOSyllabus from "./ETSOSyllabus";
import ETSOClasses from "./ETSOClasses";
import ETSOPattern from "./ETSOPattern";
import ETSOLevel from "./ETSOLevel";

const ETSO = () => {
  return (
    <>
      <div>
        <ETSOSyllabus />
        <ETSOLevel />
        <ETSOPattern />
        <ETSOClasses />
      </div>
    </>
  );
};

export default ETSO;
