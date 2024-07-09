import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchAlbumData from "../utils/hooks/useFetchAlbumData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import img from "../../../assets/Image_not_available.png";

const Albums = () => {
  const { data } = useFetchAlbumData();
  const navigate = useNavigate(); // Ensure useNavigate is called as a function

  const handleFolderClick = (album) => {
    navigate(`/album/${album}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
      <div
        className="flex flex-col py-6 justify-center items-center"
        data-aos="fade-up">
        <h1 className="text-[#ED1450] font-bold text-2xl">Our Gallery</h1>
        <p className="w-16 border-b-2 border-[#ED1450]"></p>
      </div>
      <div className="border border-gray-300 p-10 mb-10">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => {
              const imageUrl =
                item.firstImage && item.firstImage.url
                  ? `http://${IP_ADDRESS}:${PORT}${item.firstImage.url}`
                  : img;

              return (
                <div
                  key={index}
                  className="folder-container"
                  onClick={() => handleFolderClick(item.album)}>
                  <img
                    src={imageUrl}
                    alt={`Album ${item.album}`}
                    onError={(e) => (e.target.src = img)}
                    className="folder-image"
                  />
                  <h1 className="folder-title">{item.album}</h1>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No albums available.</p>
        )}
      </div>
    </div>
  );
};

export default Albums;
