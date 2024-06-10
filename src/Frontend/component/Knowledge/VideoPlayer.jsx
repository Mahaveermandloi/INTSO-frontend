import React from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ resource, handleCloseModal }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}>
      <button
        onClick={handleCloseModal}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}>
        X
      </button>
      <h2 className="text-black font-bold text-3xl ">{resource.title}</h2>
      {/* <p>Uploaded by: {resource.uploaded_by}</p> */}
      <ReactPlayer
        url={resource.resource_url}
        controls
        width="800px"
        height="480px"
        style={{ marginBottom: "20px" }}
      />
      <p className="text-black ">{resource.description}</p>
    </div>
  );
};
export default VideoPlayer;
