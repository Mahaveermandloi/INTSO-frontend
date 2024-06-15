import React from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ resource, handleCloseModal }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 max-w-screen-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg z-50">
      <button
        className="absolute top-2 right-2 bg-transparent border-none text-lg font-bold cursor-pointer"
        onClick={handleCloseModal}>
        X
      </button>
      <h2 className="text-3xl font-bold mb-4">{resource.title}</h2>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <ReactPlayer
          url={resource.resource_url}
          controls
          width="100%"
          height="100%"
        />
      </div>
      <p className="text-base">{resource.description}</p>
    </div>
  );
};
export default VideoPlayer;
