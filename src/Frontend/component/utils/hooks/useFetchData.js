import { useState, useEffect } from "react";
import { IP_ADDRESS, PORT } from "../constants";

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
        const data = await fetch(url);
        const jsonData = await data.json();
        console.log(jsonData);  
        setData1(jsonData.homedata.bannerData);
        setData3(jsonData.homedata.testiMonialData);
        setData4(jsonData.homedata.blogData);
        setData2(jsonData.homedata.news_update.newsArray);
        setData5(jsonData.homedata.news_update.EventAndExamArray);
        setData6(jsonData.homedata.news_update.updateArray);
        setData7(jsonData.homedata.galleryData);
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
