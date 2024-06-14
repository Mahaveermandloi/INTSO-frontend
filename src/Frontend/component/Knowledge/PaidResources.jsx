import React, { useEffect, useState } from "react";
import SerchBar from "./SerchBar";
import PaidResourceList from "./PaidResourceList";
import { Achivement } from "../Home/Achivement";
import { Testimonial } from "../Home/Testimonial";
import { useLocation } from "react-router-dom";

const PaidResources = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(true);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setTriggerSearch(!triggerSearch);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setTriggerSearch(!triggerSearch);
  };

  const handleSearchButtonClick = () => {
    setTriggerSearch(!triggerSearch);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (triggerSearch) {
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  const options = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="shadow-inner shadow-gray-300">
      <div className="flex items-center justify-center">
        <SerchBar
          handleSearchInputChange={handleSearchInputChange}
          searchInput={searchInput}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        {/* <div className="flex items-center ml-2">
          <select
            className="p-3 rounded-full font-bold bg-[#ED1450] text-white border-none outline-none cursor-pointer"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="" disabled className="bg-white text-black">
              Select Class
            </option>
            {options.map((option) => (
              <option
                key={option}
                value={`${option}`}
                className="bg-white text-black"
              >
                Class {option}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      <PaidResourceList
        searchInput={searchInput}
        selectedOption={selectedOption}
        triggerSearch={triggerSearch}
      />

      <div className="mt-10">
        <Achivement />
      </div>
      <div>
        <Testimonial />
      </div>
    </div>
  );
};

export default PaidResources;
