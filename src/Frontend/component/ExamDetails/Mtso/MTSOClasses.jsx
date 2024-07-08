import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    heading: "Maths (MTSO)",
    class: "Class 1st",
    Level1: [
      "Fundamentals on numbers",
      "Fundamentals on symmetry",
      "Roman numbers",
      "Figures and Shapes",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 2nd",
    Level1: [
      "Fundamentals on numbers",
      "Fundamentals on symmetry",
      "Roman numbers",
      "Figures and Shapes",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 3rd",
    Level1: [
      "Fundamentals on numbers",
      "Fundamentals on symmetry",
      "Roman numbers",
      "Figures and Shapes",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 4th",
    Level1: [
      "Fundamentals on numbers",
      "Multiples and factors",
      "Fundamentals on symmetry",
      "Divisibility rules",
      "Fundamentals on fractions",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 5th",
    Level1: [
      "Fundamentals on numbers",
      "Fundamentals on symmetry",
      "Fractions and Decimals",
      "Measurements",
      " Multiples and factors",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 6th",
    Level1: [
      "Primary number system",
      "Fundamentals on  plane Geometry",
      " Divisibility criteria",
      "Decimals and fractions",
      "LCM & HCF",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 7th",
    Level1: [
      "Fractions and Decimals",
      "Lines and angles",
      "Simple equations",
      "Number system",
      "LCM & HCF",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 8th",
    Level1: [
      "Rational numbers",
      "Linear equations in one variable",
      "Square roots and cube roots",
      "Basics on geometry",
      " Exponents and  powers",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 9th",
    Level1: [
      "Basic concepts on geometry",
      " Polynomials and factorization",
      "Linear equations in one variable",
      "Real numbers",
      "Lines and angles",
    ],
  },
  {
    heading: "Maths (MTSO)",
    class: "Class 10th",
    Level1: [
      "Real numbers ",
      "Polynomials",
      " Analytical geometry",
      "Geometry",
      "Quadratic equations",
      "Trigonometry",
    ],
  },
];

const MTSOClasses = () => {
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
                  <div className="">
                    <p className="text-[#ED1450] font-bold">Level 1</p>
                    <div className="border border-gray-200 p-10 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                        {item.heading}
                      </p>
                      {item.Level1 && item.Level1.length > 0 ? (
                        <ol>
                          {item.Level1.map((Level1Item, i) => (
                            <li key={i}>{Level1Item}</li>
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
                      {item.Level1 && item.Level1.length > 0 ? (
                        <ol>
                          {item.Level1.map((Level1Item, i) => (
                            <li key={i}>{Level1Item}</li>
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

export default MTSOClasses;
