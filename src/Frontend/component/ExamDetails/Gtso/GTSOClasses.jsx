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
    SocialScience: [],
    GKCurrentAffairs: [],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 2nd",
    SocialScience: [],
    GKCurrentAffairs: [],
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
    GKCurrentAffairs: [
      "Picture identification of temples",
      "Seven Wonders of the world",
      "List of Indian Presidents and Prime Ministers",
      "Different Music, Folk and Classical",
      "Dance forms of India",
      "World - Countries - Capitals, Currencies",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 5th",
    SocialScience: [
      "Basic Concepts of  World Geography",
      "Major natural regions of the World",
      "Indian Freedom struggle - diferent Phases",
      "United Nations Organisation",
    ],
    GKCurrentAffairs: [
      "World - Countries - Parliaments",
      "Important days in India and the World",
      "Major Indian Festivals",
      "Inventions and Discoveries",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 6th",
    SocialScience: [
      "Basic Concepts of different Land forms",
      "Globe - A Model of  the Earth",
      "Basic Concepts on  Democracy and Local",
      "Self - Governments",
    ],
    GKCurrentAffairs: [
      "National Parks and Biosphere reserves of India",
      "Inventions and Discoveries",
      "Quotations of Popular Personalities",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 7th",
    SocialScience: [" The Kakatiyas", "Vijayanagara"],
    GKCurrentAffairs: [
      "Important cities on the banks of rivers",
      "  Books and Authors",
      "First in world",
      "The Sobriquets",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 8th",
    SocialScience: [
      "The Indian Constitution",
      "Parliament",
      "Indian National Movement",
    ],
    GKCurrentAffairs: [
      "Abbreviations",
      "Countries - Capitals - Currencies",
      "First in India",
      "Chronology of Historical events in India",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 9th",
    SocialScience: [
      "India - Size - Location",
      "Physical Features of India",
      "French Revolution",
    ],
    GKCurrentAffairs: [
      "Scientific terms",
      "International Organisations",
      "Awards and Honours",
      "Computer Generations",
    ],
  },
  {
    heading: "Social science (GTSO)",
    class: "Class 10th",
    SocialScience: [
      "India - Climate",
      "Indian - Rivers & water resources",
      "The world between world wars",
      "The making of Independent India's Constitution",
      "The Independent India first 30 years (1947 - 77)",
    ],
    GKCurrentAffairs: [
      "Census of India - 2001, 2011",
      "Latest ' Who is Who' in India",
      "Chronology of events in Indian Freedom Movement",
    ],
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
                <div className="flex flex-col md:px-36 px-2 gap-3 space-y-8">
                  <p className="text-[#ED1450] font-bold">Level 1</p>
                  <div className="flex justify-around">
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                        SocialScience
                      </p>
                      {item.GKCurrentAffairs &&
                      item.GKCurrentAffairs.length > 0 ? (
                        <ol className="list-disc">
                          {item.GKCurrentAffairs.map((GKCurrentAffairs, i) => (
                            <li key={i}>{GKCurrentAffairs}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No syllabus available</p>
                      )}
                    </div>
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                        GK & Current Affairs
                      </p>
                      {item.SocialScience && item.SocialScience.length > 0 ? (
                        <ol className="list-disc">
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
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      {item.SocialScience && item.SocialScience.length > 0 ? (
                        <ol className="list-disc">
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
