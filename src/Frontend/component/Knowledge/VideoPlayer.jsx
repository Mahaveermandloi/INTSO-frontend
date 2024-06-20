import React from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ resource, handleCloseModal }) => {
  return (
    <div className="bg-gray-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 max-w-screen-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg z-50">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold ">{resource.title}</h2>
        <button
          className="   bg-transparent border-none text-lg font-bold cursor-pointer"
          onClick={handleCloseModal}>
          X
        </button>
      </div>
      <div className="aspect-w-16 aspect-h-9 ">
        <ReactPlayer
          url={resource.resource_url}
          controls
          width="100%"
          height="50vh"
        />
      </div>
      <p className="text-base">{resource.description}</p>
    </div>
  );
};
export default VideoPlayer;
