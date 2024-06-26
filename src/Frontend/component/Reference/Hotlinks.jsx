import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
const Hotlinks = () => {
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
          <h1 className="text-[#ED1450] font-bold text-2xl">Reference Links</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="flex flex-col text-lg sm:p-10 p-5 space-y-4 border border-stone-400">
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
          <a
            href="https://intso.co.in/#1448965449462-d44f1161-3817"
            className="w-full border border-gray-400 p-2 shadow-lg flex items-center justify-between"
            target="_blank"
            rel="noopener noreferrer">
            Intso Website Link
            <ArrowRightAltIcon style={{ fontSize: "50px" }} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hotlinks;
