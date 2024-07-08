import React from "react";
import img1 from "../../../../assets/Frontend_images/Group1.png";
import img2 from "../../../../assets/Frontend_images/Group2.png";
const ETSOLevel = () => {
  return (
    <>
      <div className="lg:px-24 px-6 max-w-screen-xl mx-auto ">
        <div className=" flex flex-col py-7 justify-center items-center">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Level of Olympiad Exam
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
          <p className="text-center sm:px-12 px-6 mt-5">
            Students of class 1 to 10 can now register themselves for the
            International English Olympiad Exams (IMO) individually for the
            academic year 2023-24. English Olympiad IMO has TWO Rounds of
            Examination.
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid=cols-1 mt-16 gap-y-6">
          <img src={img1} className="" />
          <p className="flex flex-col">
            <span className="text-[#ED1450] font-bold">Level 1 :</span>
            IMO English Olympiad Round 1 follows CBSE, ICSE and other State boards
            respectively and is based on school curriculum which helps students
            excel in their academics.
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid=cols-1 mt-10 gap-y-6">
          <p className="flex flex-col">
            <span className="text-[#ED1450] font-bold">Level 2 :</span>
            IMO English Olympiad Round 2 is the final round exam. Students
            performing excellent in Round 2 are awarded with exciting
            scholarship prizes and recognitions.
          </p>
          <img src={img2} className="ml-auto" />
        </div>
      </div>
    </>
  );
};

export default ETSOLevel;
