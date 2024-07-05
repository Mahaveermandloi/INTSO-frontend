import React, { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../../utils/constants";
import Spinner1 from "../../common files/Spinner1"; // Assuming Spinner1 is correctly imported

import { useLocation, useNavigate } from "react-router-dom";
import img from "../../../../../src/assets/Frontend_images/Play_SVG.png";
import useFetchImages from "../../utils/hooks/useFetchImages";
import VideoPlayer from "../VideoPlayer";
const PaidVideos = () => {
  const [page, setPage] = useState(1);
  const limit = 2;
  const { data, loading } = useFetchImages({
    page,
    limit,
    resourceType: "video",
    isPaid: true,
  });
  console.log("data", data);
  const location = useLocation();
  const [displayedData, setDisplayedData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    setDisplayedData(data);
  }, [data]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlayClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <div className="text-center text-[#ED1450] font-bold text-2xl my-5">
        All Videos
      </div>
      <div className="flex justify-center max-w-screen-xl mx-auto lg:px-24 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {displayedData.map((item) => (
            <div
              onClick={() => handlePlayClick(item)}
              className="rounded-xl flex flex-col space-y-2 border border-gray-300"
              data-aos="zoom-in"
              key={item.id}>
              <div className="relative w-full rounded-lg overflow-hidden">
                <img
                  src={`http://${IP_ADDRESS}:${PORT}${item.thumbnail}`}
                  className="w-full h-64"
                  alt={item.title}
                  style={{ display: "block" }}
                />
                <img
                  src={img}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16"
                  alt="Play Button"
                />
              </div>
              <div className="flex flex-col space-y-3 p-2">
                <div className="px-3">
                  <h1 className="text-black font-bold text-base text-start">
                    {item.title}
                  </h1>
                  <p className="text-xs text-start">{item.description}</p>
                  <p className="text-xs text-start">
                    Class- {item.resource_class}
                  </p>
                </div>
                <div>
                  <p className="border-b-2 border-gray-300 text-center mx-3"></p>
                </div>
                <div className="flex items-center mx-3 gap-x-2 justify-between">
                  <div>
                    <p className="text-xs text-nowrap">
                      <span className="text-[#ED1450]">Uploaded By </span>
                      {item.uploaded_by}
                    </p>
                    <p className="text-xs text-start">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {data.length >= page * limit && (
        <div className="flex justify-center p-5 mt-5">
          <button
            className="bg-[#ED1450] text-white p-3 rounded-full w-40"
            onClick={loadMore}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {selectedVideo && (
        <VideoPlayer
          resource={selectedVideo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default PaidVideos;
