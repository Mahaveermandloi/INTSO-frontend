import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CareerWithUs = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6 mb-10 ">
        <div
          className="flex flex-col py-6  justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">Career</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="space-y-4">
        <div className="grid lg:grid-cols-3 space-y-5 sm:grid-cols-1 grid-cols-1 p-4 border border-gray-200 rounded">
            <div className="space-y-5 flex flex-col justify-center  ">
              <p className="text-xl">UI & UX Developer</p>
              <div className="flex gap-4 items-center ">
                <h1 className="bg-blue-700 p-2 px-5 rounded-full text-white">
                  Full Time
                </h1>
                <p>New York</p>
              </div>
            </div>
            <div className="col-span-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 space-y-5 sm:grid-cols-1 grid-cols-1 p-4 border border-gray-200 rounded">
            <div className="space-y-5 flex flex-col justify-center  ">
              <p className="text-xl">UI & UX Developer</p>
              <div className="flex gap-4 items-center ">
                <h1 className="bg-blue-700 p-2 px-5 rounded-full text-white">
                  Full Time
                </h1>
                <p>New York</p>
              </div>
            </div>
            <div className="col-span-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 space-y-5 sm:grid-cols-1 grid-cols-1 p-4 border border-gray-200 rounded">
            <div className="space-y-5 flex flex-col justify-center  ">
              <p className="text-xl">UI & UX Developer</p>
              <div className="flex gap-4 items-center ">
                <h1 className="bg-blue-700 p-2 px-5 rounded-full text-white">
                  Full Time
                </h1>
                <p>New York</p>
              </div>
            </div>
            <div className="col-span-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerWithUs;
