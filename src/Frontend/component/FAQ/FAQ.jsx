import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
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
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
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
          <div className="border-b-2 border-gray-200">
            <h2
              onClick={() => toggleMenu(0)}
              className={`hover:bg-[rgba(245,241,241,0.98)] rounded-md p-2 flex justify-between items-center text-lg md:text-xl lg:text-2xl font-bold ${
                openIndex === 0 ? "text-gray-500" : "text-black"
              }`}>
              What is The Difference Between UI And UX Design?
              <button>
                {openIndex === 0 ? (
                  <RiSubtractLine className="text-2xl ml-auto" />
                ) : (
                  <LuPlus />
                )}
              </button>
            </h2>
            <div className={`py-4 ${openIndex === 0 ? "block " : "hidden"}`}>
              <p className="text-sm md:text-base lg:text-lg">
                UX stands for User Experience. It involves analyzing and
                understanding the user interaction with the features of an app.
                The aim of UX app design is to turn users into loyal customers
                by providing a splendid visual journey. On the other hand, UI is
                the acronym for User Interface. It is all about the actual
                presentation of the app while determining how every element in
                the app will align on the page in relation to one another. This
                particularly includes things like - icons, colours, buttons,
                fonts, images, etc. The primary goal of UI design is to provide
                the best interaction possible.
              </p>
            </div>
          </div>
          <div className="border-b-2 border-gray-200">
            <h2
              onClick={() => toggleMenu(1)}
              className={`hover:bg-[rgba(245,241,241,0.98)] rounded-md p-2 flex justify-between items-center text-lg md:text-xl lg:text-2xl font-bold ${
                openIndex === 1 ? "text-gray-500" : "text-black"
              }`}>
              What Are The Expected UX Deliverables?
              <button>
                {openIndex === 1 ? (
                  <RiSubtractLine className="text-2xl ml-auto" />
                ) : (
                  <LuPlus />
                )}
              </button>
            </h2>
            <div className={`py-4 ${openIndex === 1 ? "block" : "hidden"}`}>
              <p className="text-sm md:text-base lg:text-lg">
                UX Design works on the premise of design thinking and generates
                a set of deliverables. Through the various stages of the design
                process, UX practitioners empathize with end-users, identify
                their unique needs, brainstorm creative ideas, create rapid
                prototypes, and validate the end designs. UX deliverables are
                the output generated at the end of the design process which
                helps designers communicate with stakeholders, key executives,
                and team members. The timeless list of UX deliverables involves
                user personas, empathy maps, paper sketches, wireframes,
                clickable prototypes, and more.
              </p>
            </div>
          </div>
          <div className="border-b-2 border-gray-200">
            <h2
              onClick={() => toggleMenu(2)}
              className={`hover:bg-[rgba(245,241,241,0.98)] rounded-md p-2 flex justify-between items-center text-lg md:text-xl lg:text-2xl font-bold ${
                openIndex === 2 ? "text-gray-500" : "text-black"
              }`}>
              How Important Is UX And What Are The Basics Of UX Design?
              <button>
                {openIndex === 2 ? (
                  <RiSubtractLine className="text-2xl ml-auto" />
                ) : (
                  <LuPlus />
                )}
              </button>
            </h2>
            <div className={`py-4 ${openIndex === 2 ? "block" : "hidden"}`}>
              <p className="text-sm md:text-base lg:text-lg">
                User experience plays a fundamental role in an app’s success.
                The majority of users prefer simple and minimal design with
                added ease in navigation. To deliver an astounding experience,
                UX strategists must focus on behavioral patterns, align business
                and customer goals, craft designs that guarantee usability,
                accessibility, and excite users to take action. We follow a
                step-by-step process to craft meaningful experiences and make
                everything look wonderful around us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FAQ;
