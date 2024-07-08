import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IP_ADDRESS, PORT } from "../utils/constants";
import img from "../../../assets/Image_not_available.png";
import useFetchAlbumImage from "../utils/hooks/useFetchAlbumImage";

const FolderImages = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { album } = useParams();
  const { data, loading } = useFetchAlbumImage(page, limit, album);
  console.log(data);
  if (loading) {
    return <p>Loading images...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
      <div className="py-4">
        <Link to="/albums">Gallery</Link> / <span>{album}</span>
      </div>
      <h1 className="text-[#ED1450] font-bold text-2xl">{album} Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={`http://${IP_ADDRESS}:${PORT}${image.gallery_img}`}
              alt={image.title || `Image ${index}`}
              onError={(e) => (e.target.src = img)}
              className="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderImages;
