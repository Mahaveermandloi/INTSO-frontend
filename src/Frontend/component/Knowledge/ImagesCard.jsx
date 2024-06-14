// import React from "react";
// import { IP_ADDRESS, PORT } from "../utils/constants";
// import Spinner1 from "../common files/Spinner1";
// import img from "../../../../src/assets/Frontend_images/Download_SVG.png";
// import useFetchKnowledgeData from "../utils/hooks/useFetchKnowledgeData";
// import { useNavigate } from "react-router-dom";

// const ImagesCard = ({ resources, searchInput }) => {
//   const navigate = useNavigate();

//   const handleDownload = async (pdfUrl) => {
//     // console.log("Starting download for:", pdfUrl);
//     try {
//       const response = await fetch(pdfUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/pdf",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.statusText}`);
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", pdfUrl.split("/").pop());
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download error:", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
//   return (
//     <div className="space-y-10 p-3">
//       <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
//         <div className="flex flex-col py-7 justify-center items-center ">
//           <h1 className="text-[#ED1450] font-bold text-2xl">
//             All images related to work
//           </h1>
//           <p className="w-16 border-b-2 border-[#ED1450]"></p>
//         </div>
//         <div className="flex justify-center ">
//           {resources.length === 0 ? (
//             <div className="flex justify-center">
//               <Spinner1 />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 gap-5">
//               {resources.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-xl flex flex-col space-y-2 border border-gray-300"
//                   data-aos="zoom-in"
//                 >
//                   <img
//                     src={`http://${IP_ADDRESS}:${PORT}${item.resource_url}`}
//                     className="rounded-lg w-full h-64"
//                     alt={item.title}
//                   />
//                   <div className="flex flex-col space-y-3 p-2">
//                     <div className="px-3">
//                       <h1 className="text-black font-bold text-base text-start">
//                         {item.title}
//                       </h1>
//                       <p className="text-xs text-start">{item.description}</p>
//                     </div>
//                     <div>
//                       <p className="border-b-2 border-gray-300 text-center mx-3"></p>
//                     </div>
//                     <div className="flex items-center mx-3 gap-x-2 justify-between">
//                       <div>
//                         <p className="text-xs text-nowrap">
//                           <span className="text-[#ED1450]">Uploaded By </span>
//                           {item.uploaded_by}
//                         </p>
//                         <p className="text-xs text-start">
//                           {formatDate(item.createdAt)}
//                         </p>
//                       </div>
//                       <div className="flex justify-center p-1 rounded-full bg-[#ED1450] w-28 sm:min-w-20 space-x-1">
//                         <button
//                           className="text-white text-sm flex items-center"
//                           onClick={() =>
//                             handleDownload(
//                               `  http://${IP_ADDRESS}:${PORT}${item.resource_url}`
//                             )
//                           }
//                         >
//                           Download
//                           <img src={img} className="size-5" alt="Download" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       {resources.length > 0 && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={() => navigate("/images")}
//             className="bg-[#ED1450] text-white p-3 rounded-full w-32"
//           >
//             Show More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImagesCard;
import React from "react";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
import img from "../../../../src/assets/Frontend_images/Download_SVG.png";
import { useNavigate } from "react-router-dom";

const ImagesCard = ({ resources, searchInput }) => {
  const navigate = useNavigate();

  const handleDownload = async (pdfUrl) => {
    // console.log("Starting download for:", pdfUrl);
    try {
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
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
      navigate("/paidimage");
    } else {
      navigate("/images");
    }
  };

  return (
    <div className="space-y-10 p-3">
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6">
        <div className="flex flex-col py-7 justify-center items-center">
          <h1 className="text-[#ED1450] font-bold text-2xl">
            All images related to work
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
                  key={item.id}
                  className="rounded-xl flex flex-col space-y-2 border border-gray-300"
                  data-aos="zoom-in"
                >
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
                          }
                        >
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
      </div>
      {resources.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-[#ED1450] text-white p-3 rounded-full w-32"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagesCard;
