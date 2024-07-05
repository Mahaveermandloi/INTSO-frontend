import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    heading: "Social science (GTSO)",
    class: "Class 1st",
    SocialScience: [  ],
    GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 2nd",
    SocialScience: [  ],
    GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 3rd",
    SocialScience: [
        "Basic concepts of our Universe",
        "Basic Concepts of Indian Geography",
        "India's Neighbouring Countries",
    ],
     GKCurrentAffairs: [ 
      "Indian States - Capitals",
      "World - Countries - Capitals",
      "Superlatives of the World and India",
      "Picture Identification of Important",
      "Historical Structures of India and World",

      ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 4th",
    SocialScience: [
      "Fundamentals on numbers",
      "Multiples and factors",
      "Fundamentals on symmetry",
      "Divisibility rules",
      "Fundamentals on fractions",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 5th",
    SocialScience: [
      "Fundamentals on numbers",
      "Fundamentals on symmetry",
      "Fractions and Decimals",
      "Measurements",
      " Multiples and factors",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 6th",
    SocialScience: [
      "Primary number system",
      "Fundamentals on  plane Geometry",
      " Divisibility criteria",
      "Decimals and fractions",
      "LCM & HCF",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 7th",
    SocialScience: [
      "Fractions and Decimals",
      "Lines and angles",
      "Simple equations",
      "Number system",
      "LCM & HCF",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 8th",
    SocialScience: [
      "Rational numbers",
      "Linear equations in one variable",
      "Square roots and cube roots",
      "Basics on geometry",
      " Exponents and  powers",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 9th",
    SocialScience: [
      "Basic concepts on geometry",
      " Polynomials and factorization",
      "Linear equations in one variable",
      "Real numbers",
      "Lines and angles",
    ],
     GKCurrentAffairs: [  ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 10th",
    SocialScience: [
      "Real numbers ",
      "Polynomials",
      " Analytical geometry",
      "Geometry",
      "Quadratic equations",
      "Trigonometry",
    ],
     GKCurrentAffairs: [  ],
  },
];

const GTSOClasses = () => {
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
        <div className="space-y-6">
          {faq.map((item, index) => (
            <div key={index} className=" border border-gray-200 rounded-md ">
              <h2
                onClick={() => toggleMenu(index)}
                className={`hover:bg-[rgba(245,241,241,0.98)] rounded-md p-2 flex justify-between items-center text-lg md:text-xl lg:text-lg font-bold border border-gray-300 ${
                  openIndex === index ? "text-black" : "text-[#ED1450] "
                }`}>
                {item.class}
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
                <div className="flex flex-col px-36 space-y-8">
                    <p className="text-[#ED1450] font-bold">Level 1</p>
                  <div className="flex justify-around">
                    <div className="border border-gray-200 p-10 rounded-xl">
                          <p className=" mb-4 text-[#ED1450] font-semibold">
                            SocialScience
                          </p>
                          {item.GKCurrentAffairs && item.GKCurrentAffairs.length > 0 ? (
                            <ol>
                              {item.GKCurrentAffairs.map((GKCurrentAffairs, i) => (
                                <li key={i}>{GKCurrentAffairs}</li>
                              ))}
                            </ol>
                          ) : (
                            <p>No syllabus available</p>
                          )}
                        </div>
                    <div className="border border-gray-200 p-10 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                      GK & Current Affairs
                      </p>
                      {item.SocialScience && item.SocialScience.length > 0 ? (
                        <ol>
                          {item.SocialScience.map((SocialScienceItem, i) => (
                            <li key={i}>{SocialScienceItem}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No syllabus available</p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[#ED1450] font-bold">Level 2</p>
                    <div className="border border-gray-200 p-10 rounded-xl">
                      {item.SocialScience && item.SocialScience.length > 0 ? (
                        <ol>
                          {item.SocialScience.map((SocialScienceItem, i) => (
                            <li key={i}>{SocialScienceItem}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No syllabus available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GTSOClasses;
