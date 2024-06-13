import React, { useEffect, useState } from "react";
import Emerging from "../AboutUs/Emerging";
import SerchBar from "./SerchBar";
import ResourceList from "./ResourceList";
import { Achivement } from "../Home/Achivement";
import { Testimonial } from "../Home/Testimonial";
import { useLocation } from "react-router-dom";

const Knowledge = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Default to class-1
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const options = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <>
      {/* <div>
        <Emerging />
      </div> */}
      <div className="shadow-inner shadow-gray-300">
        <div>
          <SerchBar
            handleSearchInputChange={handleSearchInputChange}
            searchInput={searchInput}
          />
          <div className="flex items-center ml-2">
            <select
              className="p-3 rounded-full font-bold bg-[#ED1450] text-white border-none outline-none cursor-pointer"
              value={selectedOption}
              onChange={handleOptionChange}>
              {options.map((option) => (
                <option
                  key={option}
                  value={`${option}`}
                  className="bg-white text-black">
                  Class {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ResourceList
          searchInput={searchInput}
          selectedOption={selectedOption}
        />
        <div className="mt-10">
          <Achivement />
        </div>
        <div>
          <Testimonial />
        </div>
      </div>
    </>
  );
};

export default Knowledge;
