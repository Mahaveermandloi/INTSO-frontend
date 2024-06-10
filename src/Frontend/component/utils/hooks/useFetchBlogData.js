import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/blogs/get-all-blog-details/`;

const useFetchBlogData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const jsonData = await data.json();
      
        setData(jsonData.data.blogData);
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

export default useFetchBlogData;
