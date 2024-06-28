import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetchBlogData from "../utils/hooks/useFetchBlogData";
import { IP_ADDRESS, PORT } from "../utils/constants";
const BlogPage = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const limit = 10; 
  const { data: blogs, loading } = useFetchBlogData(page, limit);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div className="shadow-inner shadow-gray-300">
        <div className="max-w-screen-xl mx-auto lg:px-16 px-6">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 sm:px-14 px-6 sm:p-10 p-6 py-10">
            {blogs.map((item, index) => (
              <div
                key={index}
                className="flex flex-col shadow-2xl rounded-xl space-y-2 p-5">
                <img
                  src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                  className="h-52 rounded-2xl object-cover"
                  alt={item.title}
                />
                <h1 className="text-left text-2xl font-bold">{item.title}</h1>
                <p className="text-left">
                  {item.description}
                  <Link to={`/blogsdetails/${item.permalink}`}>
                    <span className="text-[#ED1450] font-bold p-4">
                      Read More...
                    </span>
                  </Link>
                </p>
                <div className="border-b-2 mt-3 border-gray-300 w-full"></div>
                <div className="flex justify-between py-4 md:text-lg">
                  <h1>
                    Posted By:{" "}
                    <span className="text-[#ED1450] font-bold">
                      {item.posted_By}
                    </span>
                  </h1>
                  <h1 className="text-[#ED1450] font-bold">
                    {formatDate(item.createdAt)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          {blogs.length >= page * limit && (
            <div className="flex justify-center m-5">
              <button
                className="text-nowrap bg-[#ED1450] lg:w-[10%] w-[32%] text-white text-lg sm:p-3 p-1 rounded-full"
                onClick={handleLoadMore}
                disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default BlogPage;
