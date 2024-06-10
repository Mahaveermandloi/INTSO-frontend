import React from "react";
import img from "../../../../src/assets/Frontend_images/Leading Olympiad.png";

export const Intso = () => {
  return (
    <>
      <div className="">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-4 mt-10">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 items-center justify-center">
            <div className="flex justify-start  ">
              <img src={`${img}`} className="w-[400px]" />
            </div>
            <div className=" text-black sm:text-justify space-y-3 text-center">
              <h1 className="text-2xl font-bold">Leading Olympiad In India</h1>
              <p>
                INTSO Is Nationally Administered Program Of Assessments In
                English, Mathematics And Science Which Benchmarks Student
                Performance Against A Broad, Inter- State Cohort Of Students And
                To The Trends In International Mathematics And Science Study.
                The INTSO Provides A Comprehensive Assessment Of Student
                Performance And Ability In English, Mathematics, Science And
                General Knowledge And Provides School, Regional And National
                Comparisons. It Is Available For Students In Class 3 To 10 In
                English, Mathematics, Science And General Knowledge.
              </p>
              <button className="bg-[#ED1450] text-white p-3 rounded-full w-32">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
