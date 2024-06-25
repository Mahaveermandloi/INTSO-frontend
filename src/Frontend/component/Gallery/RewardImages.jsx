import React, { useEffect, useState } from "react";
import ImageModal from "../Home/ImageModal";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import useFetchRewards from "../utils/hooks/useFetchRewards";
export const RewardImages = () => {
  const { data, loading } = useFetchRewards();
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
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Reward And Recognition
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-1 grid-cols-1">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="relative w-full   bg-gray-100 space-y-4 py-8 my-5 px-5 rounded-lg">
                <div className="h-[90%] flex flex-col justify-center items-center">
                  <img
                    src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                    alt=""
                    className="w-full  cursor-pointer"
                    // style={{ height: "200px", width: "100%", objectFit: "cover" }}
                    data-aos="zoom-in"
                    onClick={() => openModal(index)}
                  />
                </div>
                <div className="b-0">
                  <p className="font-bold text-lg text-center ">
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
