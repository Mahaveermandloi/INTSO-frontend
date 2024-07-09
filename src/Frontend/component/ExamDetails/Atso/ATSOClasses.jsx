import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    heading: "ATSO",
    class: "Class 1st",
    arithmatic: [],
    reasoning: [],
  },
  {
    heading: "ATSO",
    class: "Class 2nd",
    arithmatic: [],
    reasoning: [],
  },
  {
    heading: "ATSO",
    class: "Class 3rd",
    arithmatic: [],
    reasoning: [],
  },
  {
    heading: "ATSO",
    class: "Class 4th",
    arithmatic: [],
    reasoning: [],
  },
  {
    heading: "ATSO",
    class: "Class 5th",
    arithmatic: [],
    reasoning: [],
  },
  {
    heading: "ATSO",
    class: "Class 6th",
    arithmatic: ["Unit digits", "L.C.M and H.C.M", "Divisibility Rules", ,],
    reasoning: [
      "Number series",
      "Letter series",
      "Number Analogy",
      "Letter Analogy",
      "Water images",
      "Mirror images",
    ],
  },
  {
    heading: "ATSO",
    class: "Class 7th",
    arithmatic: [
      "Unit digits",
      "L.C.M and H.C.M",
      "Averages Ratio & Proportion",
    ],
    reasoning: [
      "Number series",
      " Letter series",
      " Number Analogy",
      "Letter Analogy",
      " Odd man out",
      " Non verbal series, Non verbal Analogies & Non verbal ",
      "classification",
    ],
  },
  {
    heading: "ATSO",
    class: "Class 8th",
    arithmatic: [
      " Number system",
      " Ratio & Proportion",
      "Averages",
      " Percentages",
    ],
    reasoning: [
      "Number series",
      " Letter series",
      "Number Analogy",
      "Letter Analogy",
      "Coding & decoding",
      "  Odd man out",
      " Dot situation",
      "Non verbal Series",
      "Non verbal Analogy",
      "Non verbal classification ",
      "Blood Relations",
    ],
  },
  {
    heading: "ATSO",
    class: "Class 9th",
    arithmatic: [
      "Ratio & Proportion",
      "Percentages",
      "Profit & loss",
      "Averages",
      " Time and Work",
      "Time and Distance",
    ],
    reasoning: [
      "Number series",
      "Letter series",
      "Number Analogy",
      "Letter Analogy",
      "Coding & decoding",
      " Odd man out",
      "Venn diagrams",
      " Non verbal series",
      "Non verbal Analogy",
      "Non verbal classification",
      "Paper cutting & Folding",
      " Dice",
    ],
  },
  {
    heading: "ATSO",
    class: "Class 10th",
    arithmatic: [
      "Equations",
      "Ratio & Proportion",
      "Percentages",
      "Profit & loss",
      "Average",
      "Time and Work",
      "Time & Distance",
    ],
    reasoning: [
      "Number series",
      "Letter series",
      "Number Analogy",
      "Letter Analogy",
      "Coding & decoding",
      " Odd man out",
      "Venn diagrams",
      "Directions",
      " Non verbal series",
      "Non verbal Analogy",
      "Non verbal",
      "classification",
      " Counting figures",
      "Cubes",
      "Dice",
      "Blood Relations",
    ],
  },
];

const ATSOClasses = () => {
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
                <div className="flex flex-col space-y-8 sm:px-36 px-10">
                  <div className="">
                    <p className="text-[#ED1450] font-bold">Level 1</p>
                    <div className="">
                      <p className="text-center mb-4 text-[#ED1450] font-semibold">
                        {item.heading}
                      </p>
                      <div className="flex sm:flex-row flex-col  justify-center gap-8">
                        <div className="border border-gray-200 p-4 rounded-xl">
                          <p className=" mb-4 text-[#ED1450] font-semibold">
                            Arithmetic
                          </p>
                          {item.arithmatic && item.arithmatic.length > 0 ? (
                            <ol className="list-disc m-2">
                              {item.arithmatic.map((arithmatic, i) => (
                                <li key={i}>{arithmatic}</li>
                              ))}
                            </ol>
                          ) : (
                            <p>No syllabus available</p>
                          )}
                        </div>
                        <div className="border border-gray-200 p-4 rounded-xl">
                          <p className=" mb-4 text-[#ED1450] font-semibold">
                            Reasoning
                          </p>
                          {item.reasoning && item.reasoning.length > 0 ? (
                            <ol>
                              {item.reasoning.map((reasoning, i) => (
                                <li className="list-disc m-2" key={i}>
                                  {reasoning}
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <p>No syllabus available</p>
                          )}
                        </div>
                      </div>
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

export default ATSOClasses;
