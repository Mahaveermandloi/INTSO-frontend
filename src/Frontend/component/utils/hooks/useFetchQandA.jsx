import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const useFetchQandA = (page, limit) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/Q&A/get-ques-and-ans?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              api_key: API_KEY,
            },
          }
        );
        const jsonData = await response.json();

        if (page === 1) {
          setData1(jsonData.data.GkAndCurrentAffairs);
          setData2(jsonData.data.Definitionandformula);
          setData3(jsonData.data.EnglishGrammar);
        } else {
          setData1((prevData) => [
            ...prevData,
            ...jsonData.data.GkAndCurrentAffairs,
          ]);
          setData2((prevData) => [
            ...prevData,
            ...jsonData.data.Definitionandformula,
          ]);
          setData3((prevData) => [
            ...prevData,
            ...jsonData.data.EnglishGrammar,
          ]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { data1, data2, data3, loading };
};

export default useFetchQandA;
