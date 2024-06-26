import React, { useEffect, useState } from "react";
import ImageModal from "../Home/ImageModal";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import useFetchAchiver from "../utils/hooks/useFetchAchiver";

export const ArchiverCorner = () => {
  const { data, loading } = useFetchAchiver();
  console.log(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setDisplayedData(data);
  }, [data]);

  const openModal = (index) => {
    setCurrentImage(`http://${IP_ADDRESS}:${PORT}${data[index].image}`);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPreviousImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(`http://${IP_ADDRESS}:${PORT}${data[newIndex].image}`);
  };

  const showNextImage = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentImage(`http://${IP_ADDRESS}:${PORT}${data[newIndex].image}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
        <div
          className="flex flex-col py-6  justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">Achivers Corner</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-1 grid-cols-1">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="relative w-full   space-y-4 py-4  my-5 px-5 rounded-lg"
                id="shadowstyle">
                <div
                  className=" flex flex-col justify-center items-center"
                  data-aos="zoom-in">
                  <div className="mt-0">
                    <h1 className="font-bold text-3xl">{item.name}</h1>
                  </div>
                  <img
                    src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                    alt=""
                    className="w-full cursor-pointer"
                    onClick={() => openModal(index)}
                  />
                </div>
                <div className="b-0">
                  <p className="font-semibold text-lg text-center ">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          imageSrc={currentImage}
          showPreviousImage={showPreviousImage}
          showNextImage={showNextImage}
        />
      )}
    </>
  );
};
