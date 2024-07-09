import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const useFetchAlbumImage = (page, limit, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/gallery/getGalleryData-By-page?page=${page}&limit=${limit}&album_id=${id}`,
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

        if (page === 1) {
          setData(jsonData.data);
        } else {
          setData((prevData) => [...prevData, ...jsonData.data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, id]);

  return { data, loading };
};

export default useFetchAlbumImage;
