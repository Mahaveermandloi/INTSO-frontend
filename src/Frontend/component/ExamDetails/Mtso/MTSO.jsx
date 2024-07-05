import React from "react";
import MTSOSyllabus from "./MTSOSyllabus";
import MTSOLevel from "./MTSOLevel";
import MTSOPattern from "./MTSOPattern";
import MTSOClasses from "./MTSOClasses";

const MTSO = () => {
  return (
    <>
      <div>
        <MTSOSyllabus />
        <MTSOLevel />
        <MTSOPattern />
        <MTSOClasses />
      </div>
    </>
  );
};

export default MTSO;
