import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Classes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#ED1450] font-bold text-2xl ">Classes</h1>
          <p className="w-16 border-b-2 border-[#ED1450]"></p>
        </div>
        <div class="flex justify-center items-center ">
          <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4  my-10 text-white">
            <Link to="/class1">
              <div className="bg-[#92A5FF] rounded-full h-32 w-32 flex items-center justify-center">
                Class 1st
              </div>
            </Link>
            <Link to="/class2">
              <div className="bg-[#FF8F8F] rounded-full h-32 w-32 flex items-center justify-center">
                Class 2nd
              </div>
            </Link>
            <Link to="/class3">
              <div className="bg-[#7EA670] rounded-full h-32 w-32 flex items-center justify-center">
                Class 3rd
              </div>
            </Link>
            <Link to="/class4">
              <div className="bg-[#AE962F] rounded-full h-32 w-32 flex items-center justify-center">
                Class 4th
              </div>
            </Link>
            <Link to="/class5">
              <div className="bg-[#F280A4] rounded-full h-32 w-32 flex items-center justify-center">
                Class 5th
              </div>
            </Link>
            <Link to="/class6">
              <div className="bg-[#FF9366] rounded-full h-32 w-32 flex items-center justify-center">
                Class 6th
              </div>
            </Link>
            <Link to="/class7" className="md:col-start-2 col-start-1">
              <div className="bg-[#A375FF]  rounded-full h-32 w-32 flex items-center justify-center">
                Class 7th
              </div>
            </Link>
            <Link to="/class8">
              <div className="bg-[#2ECACA] rounded-full h-32 w-32 flex items-center justify-center">
                Class 8th
              </div>
            </Link>
            <Link to="/class9">
              <div className="bg-[#859AB8] rounded-full h-32 w-32 flex items-center justify-center">
                Class 9th
              </div>
            </Link>
            <Link to="/class10">
              <div className="bg-[#5AB291] rounded-full h-32 w-32 flex items-center justify-center">
                Class 10th
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classes;
