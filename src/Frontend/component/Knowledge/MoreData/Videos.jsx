import React, { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../../utils/constants";
import Spinner1 from "../../common files/Spinner1"; // Assuming Spinner1 is correctly imported

import { useLocation, useNavigate } from "react-router-dom";
import img from "../../../../../src/assets/Frontend_images/Play_SVG.png";

const Videos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/resource/getallvideos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      const allData = jsonData.resourceData;

      // Filter out paid resources
      const unpaidData = allData.filter((item) => !item.is_paid);

      

      setData(unpaidData); // Update state with filtered data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Fetch data error:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  const handleDownload = async (imageUrl) => {
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
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="text-center text-[#ED1450] font-bold text-2xl my-5">
        All Videos
      </div>
      <div className="flex justify-center max-w-screen-xl mx-auto lg:px-24 px-6">
        {loading ? (
          <Spinner1 />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {data &&
              data.map((item) => (
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
      {data.length > 0 && <div className="flex justify-center mt-6"></div>}
    </>
  );
};

export default Videos;
