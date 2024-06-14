// // import React, { useEffect, useState } from "react";
// // import ImagesCard from "./ImagesCard";
// // import PdfCard from "./PdfCard";
// // import VideosCard from "./VideosCard";
// // import { IP_ADDRESS, PORT } from "../utils/constants";
// // import Spinner1 from "../common files/Spinner1";

// // const fetchResources = async (searchInput, selectedOption) => {
// //   const response = await fetch(
// //     `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources?searchTerm=${searchInput}&resource_class=${selectedOption}`
// //   );

// //   const data = await response.json();
// //   console.log("this is data ", data);

// //   return data.resourceData;
// // };

// // const filterUnpaidResources = (resources) => {
// //   return resources.filter((resource) => resource.is_paid);
// // };

// // const PaidResourceList = ({ searchInput, selectedOption, triggerSearch }) => {
// //   const [resources, setResources] = useState({
// //     imageArray: [],
// //     pdfArray: [],
// //     videoArray: [],
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [noDataMessage, setNoDataMessage] = useState({
// //     image: "",
// //     pdf: "",
// //     video: "",
// //   });

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await fetchResources(searchInput, selectedOption);
// //       const unpaidImageArray = filterUnpaidResources(data.imageArray);
// //       const unpaidPdfArray = filterUnpaidResources(data.pdfArray);
// //       const unpaidVideoArray = filterUnpaidResources(data.videoArray);

// //       setResources({
// //         imageArray: unpaidImageArray,
// //         pdfArray: unpaidPdfArray,
// //         videoArray: unpaidVideoArray,
// //       });

// //       setNoDataMessage({
// //         image: unpaidImageArray.length === 0 ? "No data for image" : "",
// //         pdf: unpaidPdfArray.length === 0 ? "No data for PDF" : "",
// //         video: unpaidVideoArray.length === 0 ? "No data for video" : "",
// //       });
// //     } catch (error) {
// //       console.error("Error fetching resources:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [searchInput, selectedOption, triggerSearch]);

// //   if (loading) {
// //     return <Spinner1 />;
// //   }

// //   return (
// //     <div>
// //       {resources.imageArray.length > 0 ? (
// //         <ImagesCard resources={resources.imageArray} />
// //       ) : (
// //         <p>{noDataMessage.image}</p>
// //       )}
// //       {resources.pdfArray.length > 0 ? (
// //         <PdfCard resources={resources.pdfArray} />
// //       ) : (
// //         <p>{noDataMessage.pdf}</p>
// //       )}
// //       {resources.videoArray.length > 0 ? (
// //         <VideosCard resources={resources.videoArray} />
// //       ) : (
// //         <p>{noDataMessage.video}</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default PaidResourceList;
// import React, { useEffect, useState } from "react";
// import ImagesCard from "./ImagesCard";
// import PdfCard from "./PdfCard";
// import VideosCard from "./VideosCard";
// import { IP_ADDRESS, PORT } from "../utils/constants";
// import Spinner1 from "../common files/Spinner1";

// const fetchResources = async (searchInput, selectedOption) => {
//   const response = await fetch(
//     `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources?searchTerm=${searchInput}&resource_class=${selectedOption}`
//   );

//   console.log(response.data , "ksfkdvnk n, eknfknck naknksnvkcnkn");
//   const data = await response.json();
//   console.log("this is data ", data);

//   return data.resourceData;
// };

// const filterPaidResources = (resources) => {
//   return resources.filter((resource) => resource.is_paid);
// };

// console.log("rgnisnfn")

// const PaidResourceList = ({ searchInput, selectedOption, triggerSearch }) => {
//   const [resources, setResources] = useState({
//     imageArray: [],
//     pdfArray: [],
//     videoArray: [],
//   });

//   const [loading, setLoading] = useState(true);

//   const [noDataMessage, setNoDataMessage] = useState({
//     image: "",
//     pdf: "",
//     video: "",
//   });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const data = await fetchResources(searchInput, selectedOption);
//       const paidImageArray = filterPaidResources(data.imageArray);
//       const paidPdfArray = filterPaidResources(data.pdfArray);
//       const paidVideoArray = filterPaidResources(data.videoArray);

//       setResources({
//         imageArray: paidImageArray,
//         pdfArray: paidPdfArray,
//         videoArray: paidVideoArray,
//       });

//       setNoDataMessage({
//         image: paidImageArray.length === 0 ? "No data for image" : "",
//         pdf: paidPdfArray.length === 0 ? "No data for PDF" : "",
//         video: paidVideoArray.length === 0 ? "No data for video" : "",
//       });
//     } catch (error) {
//       console.error("Error fetching resources:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchInput, selectedOption, triggerSearch]);

//   if (loading) {
//     return <Spinner1 />;
//   }

//   return (
//     <div>
//       {resources.imageArray.length > 0 ? (
//         <ImagesCard resources={resources.imageArray} />
//       ) : (
//         <p>{noDataMessage.image}</p>
//       )}
//       {resources.pdfArray.length > 0 ? (
//         <PdfCard resources={resources.pdfArray} />
//       ) : (
//         <p>{noDataMessage.pdf}</p>
//       )}
//       {resources.videoArray.length > 0 ? (
//         <VideosCard resources={resources.videoArray} />
//       ) : (
//         <p>{noDataMessage.video}</p>
//       )}
//     </div>
//   );
// };

// export default PaidResourceList;

import React, { useEffect, useState } from "react";
import ImagesCard from "./ImagesCard";
import PdfCard from "./PdfCard";
import VideosCard from "./VideosCard";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";

const fetchResources = async (searchInput, selectedOption) => {
  try {
    const response = await fetch(
      `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-paid-data-by-user?searchTerm=${searchInput}&resource_class=${selectedOption}`
    );

    // localhost:8000/api/v1/resource/?searchTerm=&resource_class=

    http: if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data.resourceData;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

const filterPaidResources = (resources) => {
  return resources.filter((resource) => resource.is_paid);
};

const PaidResourceList = ({ searchInput, selectedOption, triggerSearch }) => {
  const [resources, setResources] = useState({
    imageArray: [],
    pdfArray: [],
    videoArray: [],
  });

  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState({
    image: "",
    pdf: "",
    video: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchResources(searchInput, selectedOption);

      if (!data || typeof data !== "object") {
        throw new Error("Unexpected data structure");
      }

      const paidImageArray = filterPaidResources(data.imageArray || []);
      const paidPdfArray = filterPaidResources(data.pdfArray || []);
      const paidVideoArray = filterPaidResources(data.videoArray || []);

      setResources({
        imageArray: paidImageArray,
        pdfArray: paidPdfArray,
        videoArray: paidVideoArray,
      });

      setNoDataMessage({
        image: paidImageArray.length === 0 ? "No data for image" : "",
        pdf: paidPdfArray.length === 0 ? "No data for PDF" : "",
        video: paidVideoArray.length === 0 ? "No data for video" : "",
      });
    } catch (error) {
      console.error("Error processing resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchInput, selectedOption, triggerSearch]);

  if (loading) {
    return <Spinner1 />;
  }

  return (
    <div>
      {resources.imageArray.length > 0 ? (
        <ImagesCard resources={resources.imageArray} />
      ) : (
        <p>{noDataMessage.image}</p>
      )}
      {resources.pdfArray.length > 0 ? (
        <PdfCard resources={resources.pdfArray} />
      ) : (
        <p>{noDataMessage.pdf}</p>
      )}
      {resources.videoArray.length > 0 ? (
        <VideosCard resources={resources.videoArray} />
      ) : (
        <p>{noDataMessage.video}</p>
      )}
    </div>
  );
};

export default PaidResourceList;
