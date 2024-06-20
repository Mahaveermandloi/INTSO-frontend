

import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/blogs/get-blog-details`;

const useFetchBlogDetails = () => {

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const { permalink } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${url}/${permalink}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: "ajeet",
          },
        });
        const jsonData = await data.json();

        setData(jsonData.data.blogs);
        const sanitizedHtml = DOMPurify.sanitize(
          jsonData.data.blog.description
        );
        setData({ ...jsonData.data.blog, description: sanitizedHtml });
      
        setData1(jsonData.data.recentBlogs);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [permalink]);

  return { data, data1, loading };
};
export default useFetchBlogDetails;
