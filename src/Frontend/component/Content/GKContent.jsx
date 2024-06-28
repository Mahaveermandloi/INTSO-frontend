import React, { useEffect, useState } from "react";
import useFetchQandA from "../utils/hooks/useFetchQandA";
import { useLocation } from "react-router-dom";

const GKContent = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data1: GkAndCurrentAffairs, loading } = useFetchQandA(page, limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Slice data based on the current page and limit
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedGkAndCurrentAffairs = GkAndCurrentAffairs.slice(
    startIndex,
    endIndex
  );

  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-16 px-6">
        <div className="space-y-6">
          {displayedGkAndCurrentAffairs.map((item, index) => (
            <div
              key={index}
              className="space-y-2 border border-gray-200 rounded p-3">
              <h1 className="font-bold text-lg">
                <span>Q.{startIndex + index + 1}- </span>
                {item.question}
              </h1>
              <p>
                <span className="font-bold">Ans </span>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        {GkAndCurrentAffairs.length > endIndex && (
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
    </>
  );
};

export default GKContent;
