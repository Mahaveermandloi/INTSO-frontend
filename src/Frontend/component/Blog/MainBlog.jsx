import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetchBlogDetails from "../utils/hooks/useFetchBlogDetails";
import { IP_ADDRESS, PORT } from "../utils/constants";

const MainBlog = () => {
  const location = useLocation();
  const { id } = useParams();
  const { data: blog } = useFetchBlogDetails(id);
  const { data: recentBlogs, loading } = useFetchBlogDetails(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // If there's an error fetching data or if blog is not found, display an error message
  if (!blog) {
    return <div>Error: Blog not found</div>;
  }
  // const theObj = { __html: blog.description };

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
                className="w-full  object-cover"
                alt="Blog Cover"
              />
              <div className="flex justify-between py-4">
                <h1>
                  Posted By :
                  <span className="text-[#ED1450] font-bold ">Admin</span>
                </h1>
                <h1 className="text-[#ED1450] font-bold ">2 days ago</h1>
              </div>
              <div className=" border-b-2 mt-3 border-gray-300 w-full"></div>
              <div className="py-6 space-y-6">
                {/* <p className="text-left">{blog.description}</p> */}
                <div dangerouslySetInnerHTML={{ __html: blog.description }} />
              </div>
            </div>
            {/* <div className="text-left lg:w-[40%] w-full flex flex-col ">
              <h1 className="text-4xl font-bold text-center py-4 ">
                Recent Post
              </h1>
              <div className="space-y-5 border border-gray-300 p-6 rounded-xl mt-10">
                <div className="flex gap-6 flex-col sm:flex-row lg:flex-col">
                  {recentBlogs.map((item) => (
                    <div className="flex lg:flex-row flex-col space-y-3 ">
                      <img src="./Thumb_3.png" className="lg:w-40 w-full   " />
                      <div className="px-2">
                        <h1 className="font-bold  text-xl md:text-lg">
                          {item.title}
                        </h1>
                        <p className=" text-xl  md:text-lg">
                          {item.description}
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
                            {item.createdAt}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className=" border-b-2 mt-3 border-gray-300 w-full"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBlog;
