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
          <div className="m-16 p-1 bg-white shadow-2xl fixed top-8 md:w-[600px] md:h-[500px]   ">
            <CloseIcon
              className="float-right bg-red-600 text-white hover:bg-red-400 "
              onClick={showPopupHandler}
            />
            <div className="flex flex-col justify-center items-center space-y-5 p-10 ">
              <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themediaant.com%2Fblog%2Fwhat-is-commercial-advertising%2F&psig=AOvVaw1DCtYFFZu-NMfGEXvATpvj&ust=1719120187855000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIC__v687oYDFQAAAAAdAAAAABAX"
                className="md:"
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
