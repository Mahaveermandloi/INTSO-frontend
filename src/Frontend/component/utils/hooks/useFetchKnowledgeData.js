import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/knowledge/getKnowledgeData`;

const useFetchKnowledgeData = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const jsonData = await data.json();
        
        setData1(jsonData.knowledgeData.GetImageData);
        setData2(jsonData.knowledgeData.GetPdfData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data1, data2, loading };
};

export default useFetchKnowledgeData;
