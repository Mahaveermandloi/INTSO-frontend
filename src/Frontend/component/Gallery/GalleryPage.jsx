import React, { useEffect, useState } from "react";
import ImageModal from "../Home/ImageModal";
import { useLocation } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import useFetchGalleryData from "../utils/hooks/useFetchGalleryData";
export const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const limit = 9; // Number of items per page
  const { data, loading } = useFetchGalleryData(page, limit);
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
    setCurrentImage(`http://${IP_ADDRESS}:${PORT}${data[index].gallery_img}`);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const showPreviousImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(
      `http://${IP_ADDRESS}:${PORT}${data[newIndex].gallery_img}`
    );
  };
  const showNextImage = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentImage(
      `http://${IP_ADDRESS}:${PORT}${data[newIndex].gallery_img}`
    );
  };
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      <div className=" mb-10">
        <div
          className="flex flex-col py-6 justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">Our Gallery</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-2 grid-cols-1 ">
          {displayedData.map((item, index) => {
            let colSpanClass = "col-span-1";
            if (
              index === 0 ||
              index === 4 ||
              index === displayedData.length - 1
            ) {
              colSpanClass = "lg:col-span-2 col-span-1";
            }
            return (
              <div key={index} className={`${colSpanClass} relative w-full`}>
                <img
                  src={`http://${IP_ADDRESS}:${PORT}${item.gallery_img}`}
                  alt=""
                  className="w-full h-48 object-cover cursor-pointer"
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                  data-aos="zoom-in"
                  onClick={() => openModal(index)}
                />
              </div>
            );
          })}
        </div>
        {data.length >= page * limit && (
          <div className="flex justify-center p-5 mt-5">
            <button
              className="bg-[#ED1450] text-white p-3 rounded-full w-40"
              onClick={handleLoadMore}
              disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
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
