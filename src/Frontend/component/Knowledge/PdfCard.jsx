import React from "react";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
import img1 from "../../../../src/assets/Frontend_images/PDF_BG_1.png";
import { useNavigate } from "react-router-dom";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

const PdfCard = ({ resources }) => {
  const navigate = useNavigate();
  const handleDownload = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", pdfUrl.split("/").pop());
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
      navigate("/paidpdfs");
    } else {
      navigate("/pdfs");
    }
  };

  return (
    <div className="space-y-10">
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
        <div className="flex flex-col py-7 justify-center items-center mt-10">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            All PDF File related to work
          </h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="flex justify-center">
          {resources.length === 0 ? (
            <div className="flex justify-center">
              <Spinner1 />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {resources.map((item) => (
                <div
                  className="rounded-xl flex flex-col border border-gray-300"
                  data-aos="zoom-in"
                  key={item.id}>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={img1}
                      className="w-full"
                      alt={item.title}
                      style={{ display: "block" }}
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
                    <div className="flex  justify-between gap-2 mx-2 ">
                      <p className="text-sm">
                        <p>
                          <strong className="text-[#ED1450]">
                            Uploaded By
                          </strong>{" "}
                          {item.uploaded_by}
                        </p>
                        {formatDate(item.createdAt)}
                      </p>
                      <button
                        className="bg-[#ED1450] rounded-full flex justify-center items-center gap-1 px-1 p-1 h-fit font-seibold"
                        onClick={() =>
                          handleDownload(
                            `http://${IP_ADDRESS}:${PORT}${item.resource_url}`
                          )
                        }>
                        <h1 className="hidden md:block text-white">Download</h1>
                        <DownloadForOfflineOutlinedIcon
                          sx={{ color: "white" }}
                        />
                      </button>
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
  );
};

export default PdfCard;
