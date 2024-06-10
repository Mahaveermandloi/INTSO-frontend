import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img1 from "../../../../src/assets/Frontend_images/MTSO_2.png";
import img2 from "../../../../src/assets/Frontend_images/ATSO.png";
import img3 from "../../../../src/assets/Frontend_images/ETSO.png";
import img4 from "../../../../src/assets/Frontend_images/STSO.png";
import img5 from "../../../../src/assets/Frontend_images/STSO.png";
import logo from "../../../../src/assets/Frontend_images/MTSO.png";

export const OurExams = () => {
  return (
    <>
      <div className="bg-gray-200">
        <div className="max-w-screen-xl mx-auto lg:p-24 p-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#ED1450] text-2xl font-bold">
              Our OLYMPIAD Exams
            </h1>
            <p className="w-32 border-b-2 border-[#ED1450] "></p>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 p-5 ">
            <div
              className="bg-gray-700 p-4 space-y-2 flex flex-col items-center justify-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${img1})`,
              }}
            >
              <img src={logo} />
              <h1>MTSO</h1>
              <p className="text-center">Mathematics Talent Search Olympiad</p>
            </div>
            <div
              className="bg-gray-700 p-4 space-y-2 flex flex-col items-center justify-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${img2})`,
              }}
            >
              <img src={logo} />
              <h1>ATSO</h1>
              <p className="text-center">
                ATSO Aptitude Talent Search Olympiad
              </p>
            </div>
            <div
              className="bg-gray-700 p-4 space-y-2 flex flex-col items-center justify-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${img3})`,
              }}
            >
              <img src={logo} />
              <h1>ETSO</h1>
              <p className="text-center">ETSO English Talent Search Olympiad</p>
            </div>
            <div
              className="bg-gray-700 p-4 space-y-2 flex flex-col items-center justify-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${img4})`,
              }}
            >
              <img src={logo} />
              <h1>STSO</h1>
              <p className="text-center">Mathematics Talent Search Olympiad</p>
            </div>
            <div
              className="bg-gray-700 p-4 space-y-2 flex flex-col items-center justify-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${img5})`,
              }}
            >
              <img src={logo} />
              <h1>STSO</h1>
              <p className="text-center">Mathematics Talent Search Olympiad</p>
            </div>
          </div>
        </div>
        {/* <div className="space-x-10">
          <ArrowBackIcon sx={{ color: "#ED1450" }} />
          <ArrowForwardIcon sx={{ color: "#ED1450" }} />
        </div> */}
      </div>
    </>
  );
};
