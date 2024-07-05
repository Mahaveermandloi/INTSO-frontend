import React from "react";
import img from "../../../../src/assets/Frontend_images/About Info.png";
import { Link } from "react-router-dom";

export const AboutIntso = ({ showButton = true }) => {
  return (
    <>
      <div className="bg-gray-100" data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
          <div className=" flex flex-col py-7 justify-center items-center">
            <h1 className="text-[#ED1450] font-bold text-2xl">About INTSO</h1>

            <p className="w-16 border-b-2 border-[#ED1450]"></p>
            <p className="mt-3 text-xl font-semibold">
              “SEARCH FOR CREATIVE CHAMPIONS” “Making the younger generation
              stronger”
            </p>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 items-center justify-center">
            <div className="text-black sm:text-justify space-y-3 text-center">
              <h1 className="text-2xl font-bold">About INTSO Eduction</h1>
              <p>
                INTSO is an Educational Organization popularizing academic
                competition and assisting development of competitive spirit
                among school children. Conducting self-assessment exams INTSO
                EDUCATION was established by (is a) professionally managed
                progressive organization in the field of education, established
                in the year 2011 by eminent personalities from various fields,
                including some academicians of international repute. Since its
                inception, INTSO has brought together, the best brains in the
                field of education, in an Endeavour to make the younger
                generation fundamentally stronger and to nourish their brains
                for a bright and enterprising future. The Unified Council Team
                comprises experienced teachers and professionals having an
                intense involvement with school education. These solutions are
                based on the strong foundation of curriculum and educational
                research
              </p>
              {showButton && (
                <Link to="/aboutus">
                  <button className="bg-[#ED1450] text-white p-3 rounded-full mt-5 w-32">
                    Know More
                  </button>
                </Link>
              )}
            </div>
            <div className="flex justify-end">
              <img src={img} className="w-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
