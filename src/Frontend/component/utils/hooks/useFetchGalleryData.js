import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/gallery/getGallery`;

const useFetchGalleryData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: API_KEY,
          },
        });
        const jsonData = await data.json();

        setData(jsonData.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetchGalleryData;
