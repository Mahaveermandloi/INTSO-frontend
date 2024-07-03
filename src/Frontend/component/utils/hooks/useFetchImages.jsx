import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const useFetchImages = ({ page, limit }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedSearchInput = localStorage.getItem("searchInput") || "";
      const storedSelectedOption = localStorage.getItem("selectedOption") || "";
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-Images?page=${page}&limit=${limit}&searchTerm=${storedSearchInput}&resource_class=${storedSelectedOption}&is_paid=false`,
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
          setData(jsonData.resourceData);
        } else {
          setData((prevData) => [...prevData, ...jsonData.resourceData]);
        }
        // setData(allData);
      } catch (e) {
        console.error("Fetch data error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { data, loading };
};

export default useFetchImages;
