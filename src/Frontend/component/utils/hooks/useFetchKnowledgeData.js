import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT, API_KEY } from "../constants";
const useFetchKnowledgeData = ({ searchInput, selectedOption }) => {
  const [API_KEY, data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the fetch URL with the searchInput parameter
        const url = `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources?searchTerm=${searchInput}&resource_class=${selectedOption}`;

        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: API_KEY,
          },
        });
        const jsonData = await data.json();

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
  }, [searchInput, selectedOption]);
  return { data1, data2, data3, loading };
};
export default useFetchKnowledgeData;
