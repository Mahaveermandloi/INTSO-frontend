import React from "react";
import useFetchData from "../utils/hooks/useFetchData";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
export const Exam = () => {
  const { data5: updateArray, loading } = useFetchData();

  return (
    <>
      <div>
        <div className="max-w-screen-xl mx-auto lg:px-16 px-6 py-10">
          {loading ? (
            <div className="flex justify-center">
              <Spinner1 />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-14 gap-x-14">
              {updateArray.map((item) => (
                <div
                  className="flex sm:flex-row flex-col space-x-3 "
                  key={item.title}>
                  <img
                    className="lg:h-36 h-52 lg:w-52 w-52"
                    src={`http://${IP_ADDRESS}:${PORT}${item.image}`}
                    alt={item.title}
                  />
                  <div className="flex flex-col space-y-2 text-sm">
                    <p className="font-bold  text-left">{item.title}</p>
                    <p>{item.description}</p>
                    <p className="text-[#ED1450] text-left font-bold ">
                      Post
                      <span className="text-black p-3 font-normal">
                        {item.posted_By}
                        <span className="p-2 font-normal">August 30,2024</span>
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && (
            <div className="flex justify-center p-5">
              <button className="bg-[#ED1450] text-white p-3 rounded-full w-32">
                Know More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
