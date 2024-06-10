import React, { useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Prepration from "../Prepration";
import { useLocation } from "react-router-dom";

import img from "../../../../assets/Frontend_images/banner_image.png";

const Class2 = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="bg-[#FAFAFA]">
        <div className="lg:px-24 px-6 max-w-screen-xl mx-auto py-10">
          <div className="space-y-5">
            <div className="relative">
              <img src={img} className="w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-start lg:px-10 p-4 ">
                <h1 className="text-[#313866] md:text-4xl text-xl font-bold lg:py-5 py-0 md:w-[70%] w-full">
                  MTSO Mathematics Olympiad Questions For
                </h1>
                <div className="flex md:flex-col lg:flex-row flex-row lg:items-center gap-4 mt-4">
                  <button className="bg-[#ED1450] sm:p-2 p-0 px-4 text-white rounded-full">
                    Register Now
                  </button>
                  <button className="bg-[#ED1450] sm:p-2 p-0 text-white px-6 rounded-full">
                    Class 2nd
                  </button>
                </div>
              </div>
            </div>
            <p>
              Olympiads are tests designed to bring out the competitiveness of
              the participating students. These tests focus on bringing out the
              best in one, the very basics of a subject and its understandings
              are put to test hence when appearing for an Olympiad exam,
              students are suggested to prepare well. mathematic Olympiads are
              for the enthusiasts of the subject and to spread awareness about
              the plethora of opportunities the subject provides one with. To
              further inform one, stated below are a few benefits of appearing
              for the Olympiads:
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white m-5 lg:px-24 px-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center ">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Benefits of Maths Olympiad Class 2nd
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="">
          <ul className="space-y-5 mt-5">
            {[
              "It provides one with an opportunity to keep in touch with their subject of interest via practice. Provides the students with a much needed exposure to a variety of questions, which in turn help them improve.",
              "The tests boost student’s confidence as one learns to trust their efforts and involved skills. A set of useful resources are made available for the students to have a better understanding of a subject.",
              "A boost in student’s confidence and morale through tests and self-evaluation.",
              "Olympiads help shape and sharpens a child’s skills, like logical and analytical skills of reasoning with practice and effort. A student learns and improves upon their skill of management of time, which plays a crucial part in competitive exams.",
              "The papers are curated keeping in mind the student’s educational level, and aims to maximize their learning benefit. The syllabus of Olympiad corresponds to students’ academic syllabus; any willing candidate can participate in the exam irrespective of their education board.",
              "These tests are a good practice to help ease a student into an exam environment.",
              "Olympiads help one to understand the exam and its associated environment better so that one can learn to work in the environment.",
              "The Olympiads also provide the students with a platform for them to showcase their talents, and receive feedback from experts in the field.",
              "The students are provided with a detailed exam report so that they can make use of it to improve from thereon.",
              "All participating students are also provided with a certificate of great value, which adds to their profile.",
            ].map((text, index) => (
              <li key={index} className="flex gap-2 items-center">
                <FiberManualRecordIcon
                  sx={{ color: "#ED1450", fontSize: "1.2rem" }}
                />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Prepration />
    </>
  );
};

export default Class2;
