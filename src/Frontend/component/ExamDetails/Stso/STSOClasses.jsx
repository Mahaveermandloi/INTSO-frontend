import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    heading: "Science (STSO)",
    class: "Class 1st",
    Science: [ ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 2nd",
    Science: [  ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 3rd",
    Science: [
      "Force, work and energy",
      "Air and water",
      "Matter around us",
      "The Plant Fairy (Plants around us)",
      "Flying High",
      "Foods we Eat( Food keeps us fit and healthy)",
      "What is Cooking",
    ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 4th",
    Science: [
      "Force, work and energy",
      "Machines",
      " Air and water",
      "Changes around us",
      "Ear to Ear",
      "A Day with Nandu & The Story of Amritha",
      "Anita and the Honeybees",
      "The Valley of Flowers",
    ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 5th",
    Science: [
        "Measurement",
        "Force, Work and Energy",
        "Change around us",
        "Atmosphere and wind",
        "Experiments with water",
        "Super Senses",
        "A Snake Charmer's Story",
        "From Tasting to Dig",
        "Seeds and Seeds",

    ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 6th",
    Physics: [ 
      "Motion and meaurement of distances",
      "Fun with magnets",

    ],
    Chemistry: [ 
      "Materials and things",
      "Separation methods",
    ],
    Biology: [
      "Components of Food",
      "Getting to Know Plants",
     ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 7th",
    Physics: [
      "Motion and time",
      "Electricity",

     ],
    Chemistry: [ 
      "Nature of substances (Acids, bases and salts)",

    ],
    Biology: [
      "Nutrition in Plants",
      "Nutrition in Animals",
      "Respiration in Organisms",
     ], 
  },
  {
    heading: "Science (STSO)",
    class: "Class 8th",
    Physics: [ 
      "Force and pressure",
      "Friction",
    ],
    Chemistry: [
      "Physical and Chemical changles",
      "Coal and Petroleum",
     ],
    Biology: [ 
      "Crop Production and Management",
      "Microorganisms - Friend and Foe",
      "Conservation of Plants and Animals",

    ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 9th",
    Physics: [
      "Motion",
      "Laws of motion",
     ],
    Chemistry: [
      "Is matter pure",
      "Atoms and molecules",
     ],
    Biology: [ 
      "The Fundamental Unit of Life", 
      "Tissues",
    ],
  },
  {
    heading: "Science (STSO)",
    class: "Class 10th",
    Physics: [
      "Light reflection  and refraction",
      "Human eye and colourful world",
     ],
    Chemistry: [ 
      "Acids, bases and salts",
      "Chemical reactions and equations",
    ],
    Biology: [ 
      "Life processes (Nutrition, Respiration, Transportaion,  Excretion)",
      "Control and coordination",
    ],
  },
];

const STSOClasses = () => {
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
                <div className="flex flex-col md:px-36 px-2  space-y-8">
                    <p className="text-[#ED1450] font-bold">Level 1</p>
                  <div className="flex flex-col md:flex-row justify-center gap-5">
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                      Physics
                      </p>
                      {item.Physics && item.Physics.length > 0 ? (
                        <ol className="list-disc">
                          {item.Physics.map((PhysicsItem, i) => (
                            <li key={i}>{PhysicsItem}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No syllabus available</p>
                      )}
                    </div>
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                      Chemistry
                      </p>
                      {item.Chemistry && item.Chemistry.length > 0 ? (
                        <ol className="list-disc">
                          {item.Chemistry.map((ChemistryItem, i) => (
                            <li key={i}>{ChemistryItem}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No syllabus available</p>
                      )}
                    </div>
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                      Biology
                      </p>
                      {item.Biology && item.Biology.length > 0 ? (
                        <ol className="list-disc">
                          {item.Biology.map((BiologyItem, i) => (
                            <li key={i}>{BiologyItem}</li>
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
                      {item.Science && item.Science.length > 0 ? (
                        <ol>
                          {item.Science.map((ScienceItem, i) => (
                            <li key={i}>{ScienceItem}</li>
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

export default STSOClasses;
