import img from "../../../../src/assets/Frontend_images/Star.png";

import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";


const Benifits = () => {
  return (
    <>
      <div className="bg-white lg:px-24 px-6  max-w-screen-xl mx-auto py-5 space-y-10">
        <div className="flex flex-col items-center ">
          <h1 className="text-[#ED1450] font-bold text-2xl ">
            Benefits of Maths Olympiad
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-1  gap-4">
          <div className="bg-[#FFD363] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">Variety of Questions</h1>
          </div>
          <div className="bg-[#5B79FF] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">Academic Based Syllabus</h1>
          </div>
          <div className="bg-[#FF89EC] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">
              Improves Time Management Skills
            </h1>
          </div>
          <div className="bg-[#B492F7] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">Regular Practice</h1>
          </div>
          <div className="bg-[#FD8484] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">Immediate Results</h1>
          </div>
          <div className="bg-[#85DB60] flex flex-col  items-center p-3 space-y-5 rounded-lg">
            <img src={img} />
            <h1 className="text-white text-center">
              Certificates Boosts Confidence
            </h1>
          </div>
        </div>
        <div>
          <ul className="space-y-5">
            <li className="flex gap-2 items-center ">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              It provides one with an opportunity to keep in touch with their
              subject of interest via practice. Provides the students with a
              much needed exposure to a variety of questions, which in turn help
              them improve.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              The tests boost student’s confidence as one learns to trust their
              efforts and involved skills. A set of useful resources are made
              available for the students to have a better understanding of a
              subject.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              A boost in student’s confidence and morale through tests and
              self-evaluation.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              Olympiads help shape and sharpens a child’s skills, like logical
              and analytical skills of reasoning with practice and effort. A
              student learns and improves upon their skill of management of
              time, which plays a crucial part in competitive exams.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              The papers are curated keeping in mind the student’s educational
              level, and aims to maximize their learning benefit. The syllabus
              of Olympiad corresponds to students’ academic syllabus; any
              willing candidate can participate in the exam irrespective of
              their education board.
            </li>

            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              These tests are a good practice to help ease a student into an
              exam environment.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              Olympiads help one to understand the exam and its associated
              environment better so that one can learn to work in the
              environment.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              The Olympiads also provide the students with a platform for them
              to showcase their talents, and receive feedback from experts in
              the field.
            </li>
            <li className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              The students are provided with a detailed exam report so that they
              can make use of it to improve from thereon.
            </li>
            <l1 className="flex gap-2 items-center">
              <FiberManualRecordIcon
                sx={{ color: "#ED1450", fontSize: "1.2rem" }}
              />
              All participating students are also provided with a certificate of
              great value, which adds to their profile.
            </l1>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Benifits;
