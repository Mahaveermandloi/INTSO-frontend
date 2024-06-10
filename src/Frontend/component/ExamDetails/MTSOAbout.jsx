import React, { useEffect } from "react";
import Classes from "./Classes";
import Benifits from "./Benifits";
import Paper from "./Paper";
import Prepration from "./Prepration";
import { useLocation } from "react-router-dom";
import img from "../../../../src/assets/Frontend_images/MTSO_Page.png";




const MTSOAbout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="bg-[#FAFAFA]">
        <div className=" lg:px-24  max-w-screen-xl mx-auto py-10 space-y-10">
          <div className="space-y-5 p-2 ">
            <h1 className="text-[#ED1450] font-bold text-lg">
              MTSO Mathematics Olympiad
            </h1>
            <p className="bg-white rounded-lg p-2">
              Olympiads are greatly competitive exams meant for the school
              students, held at various levels for different subjects. A student
              when participating in the exam gains not only knowledge but also
              the opportunity to know more about various things, Maths Olympiads
              aim to spread awareness about the subject and the variety of
              opportunities it presents.
            </p>
            <div className="flex justify-center items-center">
              <img src={img} />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:gap-4 gap-2 p-2">
            <div className="bg-[#F9B74B] sm:p-3 p-1 text-white">
              OLYMPIAD EXAM
            </div>
            <div className="bg-[#382BA4] sm:p-3 p-1 text-white">
              TOPIC WISE PRACTICE SERIES
            </div>
            <div className="bg-[#00C2CB] sm:p-3 p-1 text-white">
              MODEL QUESTION PAPERS
            </div>
          </div>
          <Classes />
        </div>
      </div>
      <Benifits />
      <Paper />
      <Prepration />
    </>
  );
};

export default MTSOAbout;
