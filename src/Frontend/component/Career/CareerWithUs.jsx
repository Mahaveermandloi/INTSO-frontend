import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchCareerData from "../utils/hooks/useFetchCareerData";

const CareerWithUs = () => {
  const { data, loading } = useFetchCareerData();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-24 px-6 mb-10 ">
        <div
          className="flex flex-col py-6  justify-center items-center"
          data-aos="fade-up">
          <h1 className="text-[#ED1450] font-bold text-2xl">Career</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <div className="grid lg:grid-cols-3 space-y-5 sm:grid-cols-1 grid-cols-1 p-4 border border-gray-200 rounded">
              <div className="space-y-5 flex flex-col justify-center  ">
                <p className="text-xl">{item.job_role}</p>
                <div className="flex gap-4 items-center ">
                  <h1 className="bg-blue-700 p-2 px-5 rounded-full text-white">
                    {item.job_type}
                  </h1>
                  <p>{item.job_location}</p>
                </div>
              </div>
              <div className="col-span-2">
                <p>{item.job_description}</p>
              </div>
            </div>
          ))}
         
        </div>
      </div>
    </>
  );
};

export default CareerWithUs;
