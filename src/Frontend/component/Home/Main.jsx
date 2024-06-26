import React, { useEffect, useRef } from "react";

import { Cards } from "./Cards";
import { AboutIntso } from "./AboutIntso";
import { Intso } from "./Intso";
import { News } from "./Latest&News";
import { Achivement } from "./Achivement";
import { Blog } from "./Blog";
// import { Newssss } from "./Newssss";
import { OurExams } from "./OurExams";
import { Testimonial } from "./Testimonial";
import { AboutExam } from "./AboutExam";
import Slideshow from "./SlideShow";
import { useLocation } from "react-router-dom";
import { GalleryPage } from "../Gallery/GalleryPage";
import { Gallery } from "./Gallery";
import { Adds } from "../common files/Adds";

export const Main = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div>
        <Slideshow />
        <Cards />
        <AboutIntso />
        <Intso />
        <News />
        <Achivement />
        <Blog />
        <OurExams />
        <Testimonial />
        <AboutExam />
        <Gallery />
      </div>
      {/* <div className="relative ">
        <Adds />
      </div> */}
    </>
  );
};
