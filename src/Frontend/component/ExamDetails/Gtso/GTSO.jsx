import React from "react";
import GTSOSyllabus from "./GTSOSyllabus";
import GTSOLevel from "./GTSOLevel";
import GTSOPattern from "./GTSOPattern";
import GTSOClasses from "./GTSOClasses";

const GTSO = () => {
  return (
    <>
      <div>
        <GTSOSyllabus />
        <GTSOLevel />
        <GTSOPattern />
        <GTSOClasses />
      </div>
    </>
  );
};

export default GTSO;
