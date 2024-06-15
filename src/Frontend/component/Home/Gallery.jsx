import React, { useState } from "react";
import ImageModal from "./ImageModal";
import useFetchData from "../utils/hooks/useFetchData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { Link } from "react-router-dom";

export const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data7: galleryData, loading } = useFetchData();

  const openModal = (index) => {
    setCurrentImage(
      `http://${IP_ADDRESS}:${PORT}${galleryData[index].gallery_img}`
    );
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPreviousImage = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : galleryData.length - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(
      `http://${IP_ADDRESS}:${PORT}${galleryData[newIndex].gallery_img}`
    );
  };

  const showNextImage = () => {
    const newIndex =
      currentIndex < galleryData.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentImage(
      `http://${IP_ADDRESS}:${PORT}${galleryData[newIndex].gallery_img}`
    );
  };

  return (
    <>
      <div>
        <div
          className="flex flex-col py-6 justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">Our Gallery</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {galleryData.map((item, index) => {
            let colSpanClass = "col-span-1";
            if (
              index === 0 ||
              index === 4 ||
              index === galleryData.length - 1
            ) {
              colSpanClass = "lg:col-span-2 col-span-1";
            }
            return (
              <div key={index} className={`${colSpanClass} relative w-full`}>
                <img
                  src={`http://${IP_ADDRESS}:${PORT}${item.gallery_img}`}
                  alt=""
                  className="w-full h-48 object-cover cursor-pointer"
                  data-aos="zoom-in"
                  onClick={() => openModal(index)}
                />
              </div>
            );
          })}
        </div>
        <Link to="/gallery">
          <div className="flex justify-center p-5">
            <button className="bg-[#ED1450] text-white p-3 rounded-full w-40">
              View More
            </button>
          </div>
        </Link>
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
