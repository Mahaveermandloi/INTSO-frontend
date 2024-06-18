import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/blogs/get-blog-details`;

const useFetchBlogDetails = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: API_KEY,
          },
        });
        const jsonData = await data.json();
        setData(jsonData.data.blogs);
        const sanitizedHtml = DOMPurify.sanitize(
          jsonData.data.blog.description
        );
        setData({ ...jsonData.data.blog, description: sanitizedHtml });
        console.log(jsonData.data.recentBlogs);
        setData1(jsonData.data.recentBlogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, data1, loading };
};

export default useFetchBlogDetails;
