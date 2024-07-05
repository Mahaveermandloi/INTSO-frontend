import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    Q: "HOW DOES A STUDENT BENEFIT BY PARTICIPATING IN THE MTSO, ETSO, ATSO, STSO & GTSO?",
    A: "MTSO, ETSO, ATSO, GTSO & STSO curriculum-based examinations, are very useful for students who wish to assess their strengths and weaknesses in Math, Science, APTITUTE, G.K and English. As an integral part of the academia, these programmers will have a far-reaching effect on the competitive spirit of young minds. Based on a ‘skill blueprint’, highly experienced educational specialists develop these assessment tests. The analysis of the performance is made at individual student level, class, school and country levels.",
  },
  {
    Q: "WHO ARE ELIGIBLE?",
    A: "Students of classes III-X are eligible for MTSO, ETSO, STSO & GTSO,ATSO for 6th to 10th only.",
  },
  {
    Q: "MYSELF AND FEW OF MY FRIENDS ARE INTERESTED IN TAKING PART ININTSO’S EXAMS, BUT OUR SCHOOL HAS YET NOT RECEIVED ANY INFORMATION. WHAT DO WE DO ?",
    A: "Let us know the complete address of your school. We will send detailed information and registration forms to your School so that your Principal/ Teacher for external competitions can register your names for the exam. You can send complete address to info@intso.co.in",
  },
  {
    Q: "WHAT IS THE SYLLABUS?",
    A: " All our question papers are suitable also for students following ICSE/ISC and various other State Board",
  },
  {
    Q: "I AM GOING TO WRITE INTSO EDUCATION’S EXAMS FOR THE FIRST TIME. CAN I GET SAMPLE QUESTIONS?",
    A: "Sure, you can. Students desirous of referring to previous years’ Question Papers. ",
  },
  {
    Q: " WHAT IS THE STRUCTURE AND PATTERN OF THE EXAMINATION?",
    A: "There will be a different Question paper for each class and subject. All the questions are objective-type with no negative marking for wrong answers",
  },
  {
    Q: " ARE MTSO, ETSO, ATSO, STSO AND GTSO CONDUCTED ONLY IN ENGLISH?",
    A: " Yes. The medium of conducting these exams is only English.",
  },
  {
    Q: "WHEN ARE THE RESULTS OF MTSO/ETSO/ATSO/STSO/GTSO DECLARED?",
    A: "Results of EXAMS are declared normally 30 days after the exam date.",
  },
  {
    Q: "DO I HAVE TO REGULARLY VISIT YOUR WEBSITE FOR THE LATEST UPDATE OF INTSO EDUCATION ACTIVITIES ?",
    A: "All the important information like date, time and venue of Talent Exams, Seminars, Workshops, etc., is available on our website. So it is beneficial for you to visit our website often.",
  },
];
const FAQ = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    AOS.init();
  }, []);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="max-w-screen-xl mx-auto lg:px-24 px-6 mb-14">
      <div className="space-y-3">
        <div
          className="flex flex-col py-6  justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="space-y-6">
          {faq.map((item, index) => (
            <div key={index} className="border-b-2 border-gray-200">
              <h2
                onClick={() => toggleMenu(index)}
                className={`hover:bg-[rgba(245,241,241,0.98)] rounded-md p-2 flex justify-between items-center text-lg md:text-xl lg:text-lg font-bold ${
                  openIndex === index ? "text-gray-500" : "text-black"
                }`}>
              {item.Q}
                <button>
                  {openIndex === index ? (
                    <RiSubtractLine className="text-2xl ml-auto" />
                  ) : (
                    <LuPlus />
                  )}
                </button>
              </h2>
              <div
                className={`py-4 ${openIndex === index ? "block" : "hidden"}`}>
                <p className="text-sm md:text-base lg:text-base">{item.A}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
