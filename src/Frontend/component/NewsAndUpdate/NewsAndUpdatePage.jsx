import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LatestNewsMain } from "./LatestNewsMain";
import { ExamsMain } from "./ExamsMain";
import { EventsMain } from "./EventsMain";

export const NewsAndUpdatePage = () => {
  const [activeButton, setActiveButton] = useState("latestNews");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "latestNews":
        return <LatestNewsMain />;
      case "Event":
        return <EventsMain />;
      case "Exam":
        return <ExamsMain />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className=" lg:px-24 py-10 space-y-8">
        <div className=" flex flex-col  justify-center items-center">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Latest News & Updates
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450] "></p>
        </div>
        <div className="grid grid-cols-3 gap-6  px-10 ">
          <button
            className={`text-black bg-${
              activeButton === "latestNews"
                ? "[#ED1450] text-white"
                : "gray-200  text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("latestNews")}>
            Latest News
          </button>
          <button
            className={`text-black bg-${
              activeButton === "Exam"
                ? "[#ED1450]  text-white"
                : "gray-200 text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("Exam")}>
            Events
          </button>
          <button
            className={`text-black bg-${
              activeButton === "Event"
                ? "[#ED1450]  text-white"
                : "gray-200 text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("Event")}>
            Exams
          </button>
        </div>
        {renderComponent()}
      </div>
    </>
  );
};
