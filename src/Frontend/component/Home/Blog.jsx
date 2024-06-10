import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "../utils/hooks/useFetchData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";

export const Blog = () => {
  const { data4: blogData, loading } = useFetchData();

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <>
      <div className="">
        <div className="max-w-screen-xl mx-auto xl:px-28 px-6 py-10">
          <div
            className="flex flex-col py-10  justify-center items-center"
            data-aos="fade-up">
            <h1 className="text-[#ED1450] text-2xl font-bold">
              Latest Blog & Articles
            </h1>
            <p className="w-32 border-b-2 border-[#ED1450] "></p>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <Spinner1 />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4 ">
              {blogData.map((item, index) => (
                <div
                  className={`text-left border border-gray-300 rounded-3xl ${
                    index === 0
                      ? "row-span-2  "
                      : "flex md:flex-row flex-col justify-center items-center"
                  }`}>
                  <img
                    src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                    className={`text-left border border-gray-300 rounded-3xl ${
                      index === 0
                        ? "h-52 w-full rounded-3xl object-cover "
                        : "md:w-[35%] w-full h-full object-cover "
                    }`}
                  />
                  <div>
                    <div className="p-4 space-y-2 ">
                      <h1>{item.title}</h1>
                      <p>
                        {item.description}
                        <Link to={`/blogsdetails/${item.id}`}>
                          <span className="text-[#ED1450] font-bold p-4">
                            Read More...
                          </span>
                        </Link>
                      </p>
                      <hr className="h-0 bg-gray-400" />
                      <h1 className="text-[#ED1450] font-semibold">
                        {/* {formatDate(item.createdAt)} */}2 days ago
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/blogs">
            <div data-aos="zoom-in" className="flex justify-center mt-6">
              <button className="bg-[#ED1450] p-2 w-36 rounded-full text-white font-semibold">
                More Blog
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
