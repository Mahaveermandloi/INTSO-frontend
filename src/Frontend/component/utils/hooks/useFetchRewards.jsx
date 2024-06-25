import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";
const useFetchRewards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/v1/reward/getReward-data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              api_key: API_KEY,
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData.data);
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
export default useFetchRewards;
