import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiSubtractLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const faq = [
  {
    heading: "English (ETSO)",
    class: "Class 1st",
    English: [ ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 2nd",
    English: [],
  },
  {
    heading: "English (ETSO)",
    class: "Class 3rd",
    English: [ 
      "Kinds of sentences",
      "Nouns",
      "Pronouns",
      "Adjectives",
      "Verbs",
      "Prepositions",
      "Conjunctions",
      "Articles",
      "Spelling",
      "Singular – plural",
       ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 4th",
    English: [
      "Kinds of sentences",
      "Adjectives",
      "Verbs",
      "Prepositions",
      "Conjunctions",
      "Articles",
      "Spelling",
      "Singular – plural",
      "Articles",
      "Opposites",
      
    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 5th",
    English: [
      "Tenses",
      "Parts of Speech",
      "Articles",
      "Verb forms",
      "Spelling",
      "Singular – plural",
      "Synonyms & Antonyms",
      "Degrees of comparison",
      "Active and passive voice",
     " Comprehension passages",
    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 6th",
    English: [
      "Tenses",
      "Parts of Speech",
      "Verb forms",
      "Spelling",
      "Articles",
      "Synonyms & Antonyms",
      "Degrees of comparison",
      "Active and passive voice",
     " Direct and indirect speech",
     " Comprehension passages",
    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 7th",
    English: [
      "Tenses",
      "Verb forms",
      "Spelling",
      "Synonyms & Antonyms",
      "Degrees of comparison",
      "Active and passive voice",
      " Direct and indirect speech",
      "Subject - verb agreement",
      "Question tags",
      " Comprehension passages",
    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 8th",
    English: [
        "Tenses",                      
        "Verb forms",                     
        "Synonyms & Antonyms",                      
        "Degrees of comparison",                      
        "Active and passive voice",                     
        "Direct and indirect speech",                     
        "Subject - verb agreement",                     
        "Question tags",                      
        "Idioms and phrasal verbs",                     
        "Comprehension passages",                      
        "Spelling",                      

    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 9th",
    English: [
        "Tenses", 
        "Synonyms & Antonyms",                      
        "Degrees of comparison",                      
        "Active and passive voice",                     
        "Direct and indirect speech",                     
        "Subject - verb agreement", 
        "Idioms and phrasal verbs", 
        "If - clause conditions",
        "Cloze test", 
        "Comprehension passages",                      
        "Spelling",                   

    ],
  },
  {
    heading: "English (ETSO)",
    class: "Class 10th",
    English: [
        "Tenses", 
        "Synonyms & Antonyms",                      
        "Degrees of comparison",                      
        "Active and passive voice",  
        "Linkers",
        "Subject - verb agreement", 
        "Idioms and phrasal verbs", 
        "If - clause conditions",
        "Cloze test", 
        "Comprehension passages",                      
        "Spelling",  
    ],
  },
];

const ETSOClasses = () => {
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
                <div className="flex flex-col md:px-36 px-2 gap-3  space-y-8">
                  <div className="">
                    <p className="text-[#ED1450] font-bold">Level 1</p>
                    <div className="border border-gray-200 md:p-10 p-2 rounded-xl">
                      <p className=" mb-4 text-[#ED1450] font-semibold">
                        {item.heading}
                      </p>
                      {item.English && item.English.length > 0 ? (
                        <ol>
                          {item.English.map((EnglishItem, i) => (
                            <li className="list-disc" key={i}>{EnglishItem}</li>
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
                      {item.English && item.English.length > 0 ? (
                        <ol>
                          {item.English.map((EnglishItem, i) => (
                            <li className="list-disc" key={i}>{EnglishItem}</li>
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

export default ETSOClasses;
