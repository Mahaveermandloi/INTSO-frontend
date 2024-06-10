import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/blogs/get-blog-details`;

const useFetchBlogDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${url}/${id}`);
        const jsonData = await data.json();
        const sanitizedHtml = DOMPurify.sanitize(
          jsonData.data.blog.description
        );
        setData({ ...jsonData.data.blog, description: sanitizedHtml });
    
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading };
};

export default useFetchBlogDetails;
