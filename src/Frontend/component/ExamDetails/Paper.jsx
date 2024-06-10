import React from "react";
import img from "../../../../src/assets/Frontend_images/Paper.png";

const Paper = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
        }}
      >
        <div className="lg:px-24  max-w-screen-xl mx-auto  px-6 py-10">
          <div className="grid  grid-cols-7  gap-4">
           
            <div className="bg-white flex md:flex-row flex-col  justify-between items-center sm:p-3 p-1 col-span-2 text-black rounded-lg">
              <p>MTSO Syllabus</p>
              <button className="bg-[#ED1450] p-2 sm:px-4 px-1 text-nowrap  text-white rounded sm:rounded-full">
                View More
              </button>
         
            </div>

            <div className="sm:p-3 p-1 col-span-3  flex md:flex-row flex-col justify-between items-center text-black bg-white rounded-lg">
              <p>MTSO Previous Year Paper Level 1</p>
              <button className="bg-[#ED1450] p-2 sm:px-4 px-1  rounded text-white sm:rounded-full">
                View More
              </button>
            </div>
           
            <div className="text-black  flex md:flex-row flex-col justify-between items-center bg-white sm:p-3 p-1 col-span-2 rounded-lg">
              <p>MTSO Sample Tests</p>
              <button className="bg-[#ED1450] p-2 sm:px-4 px-1 text-nowrap  rounded text-white sm:rounded-full">
                View More
              </button>
            </div>
        
            <div className="text-black  flex md:flex-row flex-col justify-between items-center bg-white sm:p-3 p-1 col-start-2  col-span-3 rounded-lg">
              <p> MTSO Previous Year Paper Level 2</p>
              <button className="bg-[#ED1450] p-2 sm:px-4 px-1 rounded text-white sm:rounded-full">
                View More
              </button>
            </div>
         
            <div className="text-black  flex md:flex-row flex-col justify-between items-center bg-white sm:p-3 p-1  col-span-2 rounded-lg">
              <p>MTSO Mock Tests</p>
              <button className="bg-[#ED1450] p-2 sm:px-4 px-1 text-nowrap rounded text-white sm:rounded-full">
                View More
              </button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Paper;
