import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";
const useFetchGalleryData = (page, limit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/gallery/getGalleryData-By-page?page=${page}&limit=${limit}`,
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
          setData(jsonData.data);
        } else {
          setData((prevData) => [...prevData, ...jsonData.data]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, limit]);
  return { data, loading };
};
export default useFetchGalleryData;
