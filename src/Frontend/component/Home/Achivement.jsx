import React from "react";
// ./Achive.png
import img from "../../../../src/assets/Frontend_images/Achivedd.png";

export const Achivement = () => {
  return (
    <>
      <div
        data-aos="fade-up"
        className="text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-center font-bold pt-8 sm:pt-16 sm:text-2xl text-lg">
          What We Achived
        </h1>
        <ul className="flex justify-center sm:gap-10 gap-2 sm:p-16 p-5">
          <ul className="border-r-2 p-1 sm:p-5">
            <li className="sm:text-2xl md:text-4xl text-lg sm:font-bold font-semibold">
              120+
            </li>
            <li className="text-xs">Olympiads</li>
          </ul>
          <ul className="border-r-2 p-1 sm:p-5">
            <li className="sm:text-2xl md:text-4xl text-lg  sm:font-bold font-semibold">
              900+
            </li>
            <li className="text-xs">Exam Held</li>
          </ul>
          <ul className="border-r-2 p-1 sm:p-5">
            <li className="sm:text-2xl md:text-4xl text-lg  sm:font-bold font-semibold">
              3,000,000+
            </li>
            <li className="text-xs">Total Students</li>
          </ul>
          <ul className="p-1 sm:p-5">
            <li className="sm:text-2xl md:text-4xl text-lg  sm:font-bold font-semibold">
              2,000+
            </li>
            <li className="text-xs">School Registered</li>
          </ul>
        </ul>
      </div>
    </>
  );
};
