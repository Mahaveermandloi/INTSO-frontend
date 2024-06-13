// import { useState, useEffect } from "react";
// import { IP_ADDRESS, PORT } from "../constants";

// // const url = `http://${IP_ADDRESS}:${PORT}/api/v1/knowledge/getKnowledgeData`;
// const url1 =
//   "http://192.168.1.4:8000/api/v1/resource/get-all-resources?searchTerm=&resource_class=";

// const useFetchKnowledgeData = () => {
//   const [data1, setData1] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetch(url1);
//         const jsonData = await data.json();

//         setData1(jsonData.resourceData.imageArray);
//         setData2(jsonData.knowledgeData.GetPdfData);
//         setData3(jsonData.knowledgeData.videoArray);
//       } catch (e) {
//         console.log(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url1]);

//   return { data1, data2, data3, loading };
// };

// export default useFetchKnowledgeData;



import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";
const useFetchKnowledgeData = ({ searchInput, selectedOption }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the fetch URL with the searchInput parameter
        const url = `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources?searchTerm=${searchInput}&resource_class=${selectedOption}`;
        console.log("Fetch URL:", url); // Log the URL to check if it's correct
        const data = await fetch(url);
        const jsonData = await data.json();
        console.log("Fetched Data:", jsonData); // Log the fetched data
        setData1(jsonData.resourceData.imageArray);
        setData2(jsonData.resourceData.pdfArray);
        setData3(jsonData.resourceData.videoArray);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchInput, selectedOption]); // Include searchInput in the dependency array
  // Include searchInput in the dependency array
  return { data1, data2, data3, loading };
};
export default useFetchKnowledgeData;