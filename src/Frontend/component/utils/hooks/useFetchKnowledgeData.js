import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";

// const url = `http://${IP_ADDRESS}:${PORT}/api/v1/knowledge/getKnowledgeData`;
const url1 =
  "http://192.168.1.5:8000/api/v1/resource/get-all-resources?searchTerm=&resource_class=";

const useFetchKnowledgeData = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url1);
        const jsonData = await data.json();
        console.log(jsonData.resourceData.imageArray);
        setData1(jsonData.resourceData.imageArray);
        // setData2(jsonData.knowledgeData.GetPdfData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url1]);

  return { data1, data2, loading };
};

export default useFetchKnowledgeData;
