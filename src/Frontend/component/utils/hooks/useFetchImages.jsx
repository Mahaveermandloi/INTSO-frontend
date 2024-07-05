import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const useFetchImages = ({ page, limit, resourceType, isPaid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedSearchInput = localStorage.getItem("searchInput") || "";
      const storedSelectedOption = localStorage.getItem("selectedOption") || "";
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-Images?page=${page}&limit=${limit}&searchTerm=${storedSearchInput}&resource_class=${storedSelectedOption}&is_paid=${isPaid}&resource_type=${resourceType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              api_key: API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);

        if (page === 1) {
          setData(jsonData.resourceData || []);
        } else {
          setData((prevData) => [
            ...prevData,
            ...(jsonData.resourceData || []),
          ]);
        }
      } catch (e) {
        console.error("Fetch data error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, resourceType, isPaid]);

  return { data, loading };
};

export default useFetchImages;
