import React, { useState } from "react";
import { LatestNews } from "./LatestNews";
import { Exam } from "./Exam";
import { Updates } from "./Updates";
import { Header } from "../common files/Header";

export const News = () => {
  const [activeButton, setActiveButton] = useState("latestNews");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "latestNews":
        return <LatestNews />;
      case "eventsExam":
        return <Exam />;
      case "latestUpdates":
        return <Updates />;
      default:
        return null;
    }
  };
  return (
    <>
      {/* <Header /> */}
      <div className="bg-slate-100 mt-10  lg:px-24 py-10 space-y-8">
        <div
          className=" flex flex-col  justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Latest News & Updates
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450] "></p>
        </div>
        <div
          className="flex justify-center   sm:space-x-9 space-x-2 sm:p-5 p-2"
          data-aos="fade-up">
          <button
            className={`text-black bg-${
              activeButton === "latestNews"
                ? "[#ED1450] text-white"
                : "gray-200"
            } p-3 rounded-full w-36 `}
            onClick={() => handleButtonClick("latestNews")}>
            Latest News
          </button>
          <button
            className={`text-black bg-${
              activeButton === "eventsExam"
                ? "[#ED1450] text-white"
                : "gray-200"
            }  p-3 rounded-full w-36`}
            onClick={() => handleButtonClick("eventsExam")}>
            Events & Exam
          </button>
          <button
            className={`text-black bg-${
              activeButton === "latestUpdates"
                ? "[#ED1450] text-white"
                : "gray-200"
            }  p-3 rounded-full w-36`}
            onClick={() => handleButtonClick("latestUpdates")}>
            Latest Updates
          </button>
        </div>
        {renderComponent()}
      </div>
    </>
  );
};
