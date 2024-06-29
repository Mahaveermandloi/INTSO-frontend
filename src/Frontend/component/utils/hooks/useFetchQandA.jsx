import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const useFetchQandA = (postType, page, limit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/Q&A/getData-by-postType?post_Type=${encodeURIComponent(
            postType
          )}&page=${page}&limit=${limit}`,
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
          setData(jsonData.data || []);
        } else {
          setData((prevData) => [...prevData, ...(jsonData.data || [])]);
        }
      } catch (e) {
        console.error(e);
        setData([]); // Ensure data is set to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postType, page, limit]);

  return { data, loading };
};

export default useFetchQandA;
