import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax2";
import useFetchQandA from "../utils/hooks/useFetchQandA";
import { useLocation } from "react-router-dom";

const Formula = () => {
  const location = useLocation();
  const postType = "Std. Definition and Formula";
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, loading } = useFetchQandA(postType, page, limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // const startIndex = (page - 1) * limit;
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
              <MathJax.Context input="tex" className="flex justify-start">
                <div>
                  <MathJax.Node>{item.answer}</MathJax.Node>
                </div>
              </MathJax.Context>
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

export default Formula;
