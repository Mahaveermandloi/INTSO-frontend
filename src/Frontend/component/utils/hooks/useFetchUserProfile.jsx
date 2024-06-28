import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";
const useFetchUserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        // console.log("token", accessToken);
        if (accessToken) {
          const response = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/v1/user/getDetail`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const jsonData = await response.json();
          // console.log("hook", jsonData.data.data);
          setData(jsonData.data.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
};
export default useFetchUserProfile;
