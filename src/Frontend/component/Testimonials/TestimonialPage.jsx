import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY, IP_ADDRESS, PORT } from "../utils/constants";
import useFetchTestimonials from "../utils/hooks/useFetchTestimonials";

const TestimonialPage = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const limit = 5;
  const { testimonialData: data, loading } = useFetchTestimonials(page, limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div
        className="flex flex-col py-6  justify-center items-center"
        data-aos="fade-up">
        <h1 className="text-[#ED1450] font-bold text-2xl">Testimonials</h1>
        <p className="w-16 border-b-2 border-[#ED1450]"></p>
      </div>
      <div className="max-w-screen-xl mx-auto lg:px-20 px-6 py-5 space-y-10">
        {data.map((item, index) => (
          <div
            key={index}
            id="shadowstyle"
            className="flex flex-col justify-center items-center text-center space-y-4 p-2">
            <h1 className="font-bold text-xl text-center">{item.name}</h1>
            <img
              src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
              className="rounded-full w-28 h-28"
              alt="testimonial"
            />
            <p>{item.description}</p>
          </div>
        ))}
        {data.length >= page * limit && (
          <div className="flex justify-center m-5">
            <button
              className="text-nowrap bg-[#ED1450] w-fit text-white text-base sm:p-3 p-1 rounded-full"
              onClick={handleLoadMore}
              disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPage;
