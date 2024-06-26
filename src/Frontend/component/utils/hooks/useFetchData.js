import { useState, useEffect } from "react";
import { API_KEY, IP_ADDRESS, PORT } from "../constants";

const url = `http://${IP_ADDRESS}:${PORT}/api/v1/home/homeData`;
const useFetchData = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
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
        setData1(jsonData.data.homedata.bannerData);
        setData3(jsonData.data.homedata.testiMonialData);
        setData4(jsonData.data.homedata.blogData);
        setData2(jsonData.data.homedata.news_update.newsArray);
        setData5(jsonData.data.homedata.news_update.EventAndExamArray);
        setData6(jsonData.data.homedata.news_update.updateArray);
        setData7(jsonData.data.homedata.galleryData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data1, data2, data3, data4, data5, data6, data7, loading };
};

export default useFetchData;
