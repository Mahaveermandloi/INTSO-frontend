import React from "react";

export const Header = () => {
  const handleEmailClick = (event) => {
    // Prevent default behavior to avoid multiple window openings
    event.preventDefault();

    // Use window.open to open the mailto link on user interaction
    window.open("mailto:info@intso.co.in");
  };

  return (
    <>
      <div className="bg-[#313866] p-3">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-10">
          <div className="flex justify-end text-[#ADAFC2] items-center space-x-5">
            <a href="tel:+919248922777">+919248922777</a>
            <span>|</span>
            <a href="#" onClick={handleEmailClick}>
              info@intso.co.in
            </a>
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
