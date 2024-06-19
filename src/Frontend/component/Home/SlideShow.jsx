import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../component/style/adds.css";
import { Link } from "react-router-dom";
import useFetchData from "../utils/hooks/useFetchData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
import img from "../../../../src/assets/Frontend_images/Action_1.png";

const Slideshow = () => {
  const { data1: bannerData, loading } = useFetchData();
  const handleButtonClick = (route) => {
    window.location.href = route;
  };

  return (
    <>
      <div className="grid-container ">
        {loading ? (
          <div className="flex justify-center">
            <Spinner1 />
          </div>
        ) : (
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}>
            {bannerData.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  className="carousel-image md:h-[430px] h-full object-cover"
                  src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                  alt="not found"
                />
                <div className="flex flex-col lg:px-36 px-10 md:py-28 py-2 2xl:px-[440px] 2xl:py-24  text-left sm:gap-2 gap-1 absolute top-0 left-0 text-[#ED1450] ">
                  <div className="max-w-screen-xl mx-auto 2xl:w-full">
                    <p className="sm:text-5xl text-xl 2xl:text-6xl font-bold">
                      {item.title.toUpperCase()}
                    </p>
                    <p className="text-xl 2xl:text-4xl  font-semibold">
                      {item.description.charAt(0).toUpperCase() +
                        item.description.slice(1)}
                    </p>
                    <button
                      className="sm:p-2 sm:px-5 px-2 sm:w-48 w-32 2xl:w-72 2xl:text-xl  bg-[#ED1450] text-white rounded-full"
                      onClick={() => handleButtonClick(item.link)}>
                      {item.link}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
        <div
          className="bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${img})`,
          }}>
          <div className="max-w-screen-xl mx-auto lg:px-24 px-10 p-10">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 text-white">
              <div className="text-left">
                <h1 className="text-2xl font-bold">REGISTER YOUR SCHOOL NOW</h1>
                <p>Enroll your school in few steps. Click on Register Now</p>
              </div>
              <div className="text-right">
                <Link to="/register">
                  <button className="text-white p-2 rounded-full w-36 font-bold bg-[#ED1450]">
                    Register Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;
