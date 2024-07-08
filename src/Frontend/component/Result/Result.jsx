import React from "react";

const Result = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-10">
        <div className="flex flex-col items-center w-1/2">
          <div className=" ">
            <select className="border border-gray-300 p-4 px-6 rounded-lg ">
              <option value="">Check Result - Level- 1</option>
              <option value="">Check Result - Level- 2</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-left p-2">
              Pin Code<span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your pin code"
              className="border border-gray-300 p-2 px-4 rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
