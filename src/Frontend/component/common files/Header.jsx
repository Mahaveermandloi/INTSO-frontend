import React from "react";

export const Header = () => {
  return (
    <>
      <div className="bg-[#313866] p-3">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-10">
          <div className="flex justify-end text-[#ADAFC2] items-center space-x-5">
            <h1>+919248922777</h1>
            <span>|</span>
            <h1>info@intso.co.in</h1>
            <span className="hidden md:block">|</span>
            <h1 className="hidden md:block">
              AN ISO 9001-2008 Certified Organisation
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
