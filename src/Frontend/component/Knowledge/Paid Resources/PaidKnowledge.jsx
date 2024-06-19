// import React, { useEffect } from "react";
// import PaidResources from "../PaidResources";

// const PaidKnowledge = () => {
//   useEffect(() => {
//     const handleContextMenu = (event) => {
//       event.preventDefault();
//     };
//     document.addEventListener("contextmenu", handleContextMenu);

//   }, []);

//   return (
//     <>
//       <PaidResources />
//     </>
//   );
// };

// export default PaidKnowledge;

import React, { useEffect } from "react";
import PaidResources from "../PaidResources";

const PaidKnowledge = () => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyUp = (e) => {
      var keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 44) {
        // KeyCode for Print Screen
        stopPrntScr();
      }
    };

    const stopPrntScr = () => {
      var inpFld = document.createElement("input");
      inpFld.setAttribute("value", ".");
      inpFld.setAttribute("width", "0");
      inpFld.style.height = "0px";
      inpFld.style.width = "0px";
      inpFld.style.border = "0px";
      document.body.appendChild(inpFld);
      inpFld.select();
      document.execCommand("copy");
      inpFld.remove();
    };

    const accessClipboardData = () => {
      try {
        window.clipboardData.setData("text", "Access Restricted");
      } catch (err) {
        // Handle errors if necessary
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keyup", handleKeyUp);
    const clipboardInterval = setInterval(accessClipboardData, 300);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keyup", handleKeyUp);
      clearInterval(clipboardInterval);
    };
  }, []);

  return (
    <>
      <PaidResources />
    </>
  );
};

export default PaidKnowledge;
