import React, { useEffect, useState } from "react";
import useFetchQandA from "../utils/hooks/useFetchQandA";
import { useLocation } from "react-router-dom";

const GKContent = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, loading } = useFetchQandA("GK & Current Affairs", page, limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="max-w-screen-xl mx-auto lg:px-16 px-6">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="space-y-2 border border-gray-200 rounded p-3">
            <h1 className="font-bold text-lg">
              <span>Q.{index + 1} </span>
              {item.question}
            </h1>
            <p>
              <span className="font-bold">Ans </span>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
      {data.length >= page * limit && (
        <div className="flex justify-center m-5">
          <button
            className="text-nowrap bg-[#ED1450] w-fit text-white text-lg sm:p-3 p-1 rounded-full"
            onClick={handleLoadMore}
            disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GKContent;
