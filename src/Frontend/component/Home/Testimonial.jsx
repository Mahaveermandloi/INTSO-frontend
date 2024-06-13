import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useFetchData from "../utils/hooks/useFetchData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";

import img from "../../../Frontend/image/TestiMonial.png";

export const Testimonial = () => {
  const { data3: testiMonialData, loading } = useFetchData();
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = () => {
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${img})` }}>
        {loading ? (
          <div className="flex justify-center">
            <Spinner1 />
          </div>
        ) : (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: isSwiping ? "none" : "auto" }}>
            <Carousel
              autoPlay
              interval={3000}
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              swipeable={!isSwiping} // Disable swiping when touch starts
            >
              {testiMonialData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center ">
                  <div className="max-w-screen-xl mx-auto lg:px-28 px-6 py-6">
                    <div className="flex flex-col justify-center items-center mb-10">
                      <h1 className="text-white text-2xl font-bold">
                        Testimonial
                      </h1>
                      <p className="w-16 border-b-2 border-white"></p>
                    </div>
                    <div className="space-y-1">
                      <img
                        className="carousel-image1"
                        src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                        alt={item.alt}
                      />
                      <div className="p-10 flex flex-col justify-center items-center space-y-3">
                        <h1 className="font-bold text-white text-xl">
                          {item.name}
                        </h1>
                        <p className="text-white">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
};
