import React, { useEffect, useState } from "react";
import SerchBar from "./SerchBar";
import PaidResourceList from "./PaidResourceList";
import { Achivement } from "../Home/Achivement";
import { Testimonial } from "../Home/Testimonial";
import { useLocation } from "react-router-dom";

const PaidResources = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setTriggerSearch(true);
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



  return (
    <div className="shadow-inner shadow-gray-300">
      <div className="flex items-center justify-center">
        <SerchBar
          handleSearchInputChange={handleSearchInputChange}
          searchInput={searchInput}
          handleSearchButtonClick={handleSearchButtonClick}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
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
