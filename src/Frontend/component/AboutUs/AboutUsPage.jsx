import React, { useEffect } from "react";
import { AboutIntso } from "../Home/AboutIntso";
import { Achivement } from "../Home/Achivement";
import AtAGlance from "./AtAGlance";
import { Testimonial } from "../Home/Testimonial";
import { OurVision } from "./OurVision";
import { OurMission } from "./OurMission";
import { useLocation } from "react-router-dom";

const AboutUsPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="shadow-inner shadow-gray-300">
      {/* <Emerging /> */}
      <AboutIntso showButton={false} />
      <Achivement />
      <AtAGlance />
      <OurVision />
      <OurMission />
      {/* <Testimonial /> */}
    </div>
  );
};

export default AboutUsPage;
