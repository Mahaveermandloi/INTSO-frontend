import React from "react";

const SerchBar = () => {
  return (
    <div className="sm:p-10 p-5 space-y-16 " data-aos="fade-up">
      <div className="text-center mb-4">
        <h1 className="text-2xl text-[#ED1450] font-bold">
          Search Updated Images, Videos and PDF File by Intso
        </h1>
        <p>Search Updated Images, Videos and PDF File by Intso</p>
      </div>
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-[600px]">
          <input
            type="text"
            placeholder="Search Images/Viedo/PDF"
            className=" p-2 rounded-full w-full bg-white shadow-lg border border-gray-400"
          />
          <button className="text-white p-2 rounded-full font-bold bg-[#ED1450] absolute right-0 top-0 bottom-0 w-16 sm:w-28 ">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SerchBar;
