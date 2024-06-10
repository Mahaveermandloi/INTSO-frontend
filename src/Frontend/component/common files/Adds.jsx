import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
export const Adds = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const showPopupHandler = () => setShowPopUp(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPopUp && (
        <div className="flex justify-center items-center ">
          <div className="m-16 p-1 bg-white shadow-2xl fixed top-8 md:w-[600px] w-[400px] md:h-[500px] h-auto  ">
            <CloseIcon
              className="float-right bg-red-600 text-white hover:bg-red-400 "
              onClick={showPopupHandler}
            />
            <div className="flex flex-col justify-center items-center space-y-5 p-10 ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENEzluGyggUnII6uZk6rYVpluyHZrN6n7Tg&usqp=CAU"
                className="w-[100%] h-96"
              />
              <button
                className="bg-[#ED1450] p-2 w-36 rounded-full"
                onClick={showPopupHandler}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
