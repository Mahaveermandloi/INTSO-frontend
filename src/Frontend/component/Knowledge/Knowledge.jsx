import React, { useEffect, useState } from "react";
import Emerging from "../AboutUs/Emerging";
import SerchBar from "./SerchBar";
import ImagesCard from "./ImagesCard";
import VideosCard from "./VideosCard";
import PdfCard from "./PdfCard";
import { Achivement } from "../Home/Achivement";
import { Testimonial } from "../Home/Testimonial";
import { useLocation } from "react-router-dom";
import ResourceList from "./ResourceList";

const Knowledge = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      {/* <div>
        <Emerging />
      </div> */}
      <div className="shadow-inner shadow-gray-300">
        <div>
          <SerchBar />
        </div>
        <ResourceList />
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
