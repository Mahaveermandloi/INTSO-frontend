import React, { useEffect, useState } from "react";
import GKContent from "./GKContent";
import Formula from "./Formula";
import English from "./English";
import { useLocation } from "react-router-dom";

export const SubjectTabs = () => {
  const [activeButton, setActiveButton] = useState("gk");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "gk":
        return <GKContent />;
      case "formula":
        return <Formula />;
      case "english":
        return <English />;
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
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-6 gap-1 px-10 ">
          <button
            className={`text-black bg-${
              activeButton === "gk"
                ? "[#ED1450] text-white"
                : "gray-200  text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("gk")}>
            GK & Current Affairs
          </button>
          <button
            className={`text-black bg-${
              activeButton === "formula"
                ? "[#ED1450]  text-white"
                : "gray-200 text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("formula")}>
            Std. Definition and formula
          </button>
          <button
            className={`text-black bg-${
              activeButton === "english"
                ? "[#ED1450]  text-white"
                : "gray-200 text-black"
            } sm:p-3 p-1    `}
            onClick={() => handleButtonClick("english")}>
            English grammar
          </button>
        </div>
        {renderComponent()}
      </div>
    </>
  );
};
