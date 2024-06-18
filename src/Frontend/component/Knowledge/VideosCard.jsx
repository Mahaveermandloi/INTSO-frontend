import React, { useState } from "react";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
import VideoPlayer from "./VideoPlayer";
import img from "../../../../src/assets/Frontend_images/Play_SVG.png";
import { useNavigate } from "react-router-dom";

const VideosCard = ({ resources }) => {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlayClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleDownload = async (videoUrl) => {
    try {
      const response = await fetch(videoUrl, {
        method: "GET",
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", videoUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShowMore = () => {
    const hasPaidResources = resources.some((item) => item.is_paid);
    if (hasPaidResources) {
      navigate("/paidvideos");
    } else {
      navigate("/videos");
    }
  };

  return (
    <>
      <div className="space-y-10">
        <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
          <div className="flex flex-col py-7 justify-center items-center mt-10">
            <h1 className="text-[#ED1450] font-bold text-2xl">
              All Videos related to work
            </h1>
            <p className="w-16 border-b-2 border-[#ED1450]"></p>
          </div>
          <div className="flex justify-center">
            {resources.length === 0 ? (
              <div className="flex justify-center">
                <Spinner1 />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {resources.map((item) => (
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
            )}
          </div>
          {resources.length >= 3 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-[#ED1450] text-white p-3 rounded-full w-32">
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedVideo && (
        <VideoPlayer
          resource={selectedVideo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default VideosCard;
