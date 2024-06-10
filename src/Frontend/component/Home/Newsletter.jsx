import React from "react";
import img from "../../../../src/Frontend/image/Newsletter.png";

const Newsletter = () => {
  return (
    <div
      className="b-0"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}
    >
      <div className=" max-w-screen-xl mx-auto grid lg:grid-cols-2 lg-gap-y-0 gap-y-6 grid-cols-1 lg:px-28 gap-x-10 px-6 p-16 text-white">
        <div className="">
          <h1 className="text-3xl">Newsletter</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
        <div className="space-x-4 flex justify-end">
          <input
            type="text"
            placeholder="Enter your emailId"
            className="bg-white lg:p-2 p-3 px-3 rounded-lg w-[70%]"
          />
          <button className="bg-[#ED1450] px-12 lg:p-2 p-3 w-40 rounded-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
