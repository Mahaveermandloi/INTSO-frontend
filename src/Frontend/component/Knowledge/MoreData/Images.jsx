import React, { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../../utils/constants";
import Spinner1 from "../../common files/Spinner1"; // Assuming Spinner1 is correctly imported
import img from "../../../../../src/assets/Frontend_images/Download_SVG.png";
import { useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaCheck, FaSpinner } from "react-icons/fa";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import useFetchImages from "../../utils/hooks/useFetchImages";

const Images = () => {
  const [page, setPage] = useState(1);
  const limit = 2;
  const { data, loading } = useFetchImages(page, limit);
  console.log("data", data);
  const location = useLocation();
  const [downloadingId, setDownloadingId] = useState(null);
  const [showSuccessIcon, setShowSuccessIcon] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    setDisplayedData(data);
  }, [data]);

  const handleDownload = async (imageUrl, id) => {
    setDownloadingId(id);
    try {
      const response = await fetch(imageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "image/jpeg", // Adjust content type as per your image type
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setShowSuccessIcon(id);
      setTimeout(() => {
        setShowSuccessIcon(null);
      }, 2000);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloadingId(null);
    }
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
        All Images
      </div>
      <div className="flex justify-center max-w-screen-xl mx-auto lg:px-24 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {displayedData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl flex flex-col space-y-2 border border-gray-300"
              data-aos="zoom-in">
              <img
                src={`http://${IP_ADDRESS}:${PORT}${item.resource_url}`}
                className="rounded-lg w-full h-64"
                alt={item.title}
              />
              <div className="flex flex-col space-y-3 p-2">
                <div className="px-3">
                  <h1 className="text-black font-bold text-base text-start">
                    {item.title}
                  </h1>
                  <p className="text-xs text-start">{item.description}</p>
                  <p className="text-xs text-start">
                    class- {item.resource_class}
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
                  <div className="flex justify-center p-1 rounded-full bg-[#ED1450] w-28 sm:min-w-20 space-x-1">
                    <button
                      className={`bg-[#ED1450] rounded-full flex justify-center items-center gap-1 px-1 p-1 h-fit font-semibold ${
                        downloadingId === item.id ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        handleDownload(
                          `http://${IP_ADDRESS}:${PORT}${item.resource_url}`,
                          item.id
                        )
                      }
                      disabled={downloadingId === item.id}>
                      <h1 className="hidden md:block text-white">
                        {downloadingId === item.id ? (
                          <FaSpinner className="animate-spin" />
                        ) : showSuccessIcon === item.id ? (
                          <FaCheck />
                        ) : (
                          "Download"
                        )}
                      </h1>
                      <DownloadForOfflineOutlinedIcon sx={{ color: "white" }} />
                    </button>
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
    </>
  );
};

export default Images;
