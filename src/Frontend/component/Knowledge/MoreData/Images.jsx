import React, { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../../utils/constants";
import Spinner1 from "../../common files/Spinner1"; // Assuming Spinner1 is correctly imported
import img from "../../../../../src/assets/Frontend_images/Download_SVG.png";
import { useLocation } from "react-router-dom";

const Images = () => {
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
        `http://${IP_ADDRESS}:${PORT}/api/v1/resource/getallimages`,
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
        All Images
      </div>
      <div className="flex justify-center max-w-screen-xl mx-auto lg:px-24 px-6">
        {loading ? ( // Display spinner while loading
          <Spinner1 />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {data &&
              data.map((item) => (
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
                          className="text-white text-sm flex items-center"
                          onClick={() =>
                            handleDownload(
                              `http://${IP_ADDRESS}:${PORT}${item.resource_url}`
                            )
                          }>
                          Download
                          <img src={img} className="size-5" alt="Download" />
                        </button>
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

export default Images;
