import React, { useEffect, useState } from "react";
import ImageModal from "../Home/ImageModal";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";

const data = [
  {
    image:
      "https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF1000,1000_QL80_.jpg",
    title: "Certificate 1",
  },
  {
    image:
      "https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF1000,1000_QL80_.jpg",
    title: "Certificate 2",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAK9Zvubtmr0mjIebeO5j691t1WAPV5vNcUQ&s",
    title: "Certificate 3",
  },
  // Add more image objects as needed
];

export const MemberShipCertification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const openModal = (index) => {
    setCurrentImage(`${data[index].image}`);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPreviousImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(`${data[newIndex].image}`);
  };

  const showNextImage = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentImage(`${data[newIndex].image}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
        <div
          className="flex flex-col py-6 justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            Memberships Associations & Certification
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-1 grid-cols-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative w-full bg-gray-100 space-y-4 py-8 my-5 px-5 rounded-lg">
              <div className="h-[90%] flex flex-col justify-center items-center">
                <img
                  src={`${item.image}`}
                  alt={item.title}
                  className="w-full cursor-pointer"
                  data-aos="zoom-in"
                  onClick={() => openModal(index)}
                />
              </div>
              <div className="b-0">
                <p className="font-bold text-lg text-center">{item.title}</p>
              </div>
            </div>
          ))}
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
