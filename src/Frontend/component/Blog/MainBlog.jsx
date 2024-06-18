import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetchBlogDetails from "../utils/hooks/useFetchBlogDetails";
import { IP_ADDRESS, PORT } from "../utils/constants";

const MainBlog = () => {
  const location = useLocation();
  const { id } = useParams();
  const { data: blog, loading } = useFetchBlogDetails(id);
  const { data1: recentBlogs } = useFetchBlogDetails(id);
  console.log(recentBlogs);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="shadow-gray-300  bg-gray-50 shadow-inner">
        <div className="max-w-screen-xl mx-auto  lg:px-20 px-6  ">
          <div className=" py-10 flex lg:flex-row flex-col gap-5 ">
            <div className="lg:w-[60%] w-full">
              <h1 className="text-left py-4 text-4xl font-bold">
                {blog.title}
              </h1>
              <img
                src={`http://${IP_ADDRESS}:${PORT}${blog.image}`}
                className="w-full  object-cover rounded-xl"
                alt="Blog Cover"
              />
              <div className="flex justify-between py-4">
                <h1>
                  Posted By :
                  <span className="text-[#ED1450] font-bold ">
                    {blog.posted_By}
                  </span>
                </h1>
                <h1 className="text-[#ED1450] font-bold ">
                  {" "}
                  {formatDate(blog.createdAt)}
                </h1>
              </div>
              <div className=" border-b-2 mt-3 border-gray-300 w-full"></div>
              <div className="py-6 space-y-6">
                <div dangerouslySetInnerHTML={{ __html: blog.description }} />
              </div>
            </div>
            <div className="text-left lg:w-[40%] w-full flex flex-col mt-8">
              <h1 className="text-4xl font-bold text-center ">Recent Post</h1>
              <div className="space-y-5 border border-gray-300 p-6 rounded-xl mt-10">
                <div className="flex gap-6 flex-col sm:flex-row lg:flex-col">
                  {recentBlogs.map((item) => (
                    <div className="flex lg:flex-row flex-col  ">
                      <img
                        src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                        className="lg:w-40 w-full h-40 object-cover rounded-xl "
                      />
                      <div className="px-2">
                        <h1 className="font-bold text-xl md:text-lg">
                          {item.title}
                        </h1>
                        <p className=" text-xl  md:text-lg">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </p>
                        <div className=" border-b-2 mt-3 border-gray-300"></div>
                        <div className=" py-4  md:text-lg">
                          <h1>
                            Posted By :
                            <span className="text-[#ED1450] font-bold ">
                              {item.posted_By}
                            </span>
                          </h1>
                          <h1 className="text-[#ED1450] font-bold ">
                            {formatDate(item.createdAt)}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBlog;
