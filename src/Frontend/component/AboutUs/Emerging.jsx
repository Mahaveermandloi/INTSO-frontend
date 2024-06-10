import React from "react";
import img from "../../../../src/assets/Frontend_images/About Banner Plan.png";

const Emerging = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="sm:h-[280px] h-[200px] flex flex-col justify-center"
    >
      <div className="flex flex-col text-left gap-2 p-10 sm:p-20">
        <p className="text-[#FFFFFF] text-3xl sm:text-5xl font-bold  ">
          Emerging Approach
        </p>
        <p className="text-2xl sm:text-4xl font-semibold text-[#FFFFFF] ">
          towords learning
        </p>
        <button className=" p-1 sm:p-2 sm:px-5 w-28 sm:w-48  bg-[#ED1450] rounded-full ">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Emerging;
