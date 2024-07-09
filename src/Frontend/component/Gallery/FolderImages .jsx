import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import img from "../../../assets/Image_not_available.png";
import useFetchAlbumImage from "../utils/hooks/useFetchAlbumImage";
import ImageModal from "../Home/ImageModal";

const FolderImages = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { album } = useParams();
  const { data, loading } = useFetchAlbumImage(page, limit, album);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
  console.log(data);
  const openModal = (index) => {
    setCurrentImage(`http://${IP_ADDRESS}:${PORT}${data[index].gallery_img}`);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setDisplayedData(data);
  }, [data]);
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
  if (loading) {
    return <p>Loading images...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
      <div className="py-4">
        <Link to="/albums">Gallery</Link> / <span>{album}</span>
      </div>
      <h1 className="text-[#ED1450] font-bold text-2xl">{album} Gallery</h1>

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
                onError={(e) => (e.target.src = img)}
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

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          imageSrc={currentImage}
          showPreviousImage={showPreviousImage}
          showNextImage={showNextImage}
        />
      )}
    </div>
  );
};

export default FolderImages;
