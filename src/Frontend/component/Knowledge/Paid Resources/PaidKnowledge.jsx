// import React, { useEffect } from "react";
// import PaidResources from "../PaidResources";

// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   zIndex: 9999,
//   pointerEvents: "none", // Allows clicks to pass through to elements below
// };

// const PaidKnowledge = () => {
//   useEffect(() => {
<<<<<<< HEAD
//     const handleContextMenu = (event) => {
//       event.preventDefault();
//     };
//     document.addEventListener("contextmenu", handleContextMenu);

=======
//     const handleKeyUp = (e) => {
//       if (e.key === "PrintScreen") {
//         alert("Screenshots are not allowed on this application.");
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.ctrlKey && e.key === "p") {
//         alert("Printing is not allowed on this application.");
//         e.cancelBubble = true;
//         e.preventDefault();
//         e.stopImmediatePropagation();
//       }
//     };

//     const addWatermark = () => {
//       const watermark = document.createElement("div");
//       watermark.innerText = "Confidential";
//       watermark.style.position = "fixed";
//       watermark.style.top = "50%";
//       watermark.style.left = "50%";
//       watermark.style.transform = "translate(-50%, -50%)";
//       watermark.style.color = "rgba(255, 0, 0, 0.5)";
//       watermark.style.fontSize = "50px";
//       watermark.style.zIndex = "9999";
//       watermark.style.pointerEvents = "none";
//       document.body.appendChild(watermark);
//     };

//     const handleContextMenu = (e) => {
//       e.preventDefault();
//     };

//     document.addEventListener("keyup", handleKeyUp);
//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("contextmenu", handleContextMenu);
//     document.addEventListener("DOMContentLoaded", addWatermark);

//     // Attempt to disable Windows + Shift + S
//     document.addEventListener("keydown", (e) => {
//       if (e.ctrlKey && e.shiftKey && e.key === "s") {
//         e.preventDefault();
//         alert("Screenshots are not allowed on this application.");
//       }
//     });

//     return () => {
//       document.removeEventListener("keyup", handleKeyUp);
//       document.removeEventListener("keydown", handleKeyDown);
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("DOMContentLoaded", addWatermark);
//     };
>>>>>>> 513ccdd7469db6abdf9acd3117ee6d37fe5b8ead
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           ...overlayStyle,
//         }}></div>

//       <PaidResources />
//       <style>
//         {`@media print {
//           body * {
//             visibility: hidden;
//           }
//           .printable, .printable * {
//             visibility: visible;
//           }
//           .printable {
//             position: absolute;
//             left: 0;
//             top: 0;
//           }
//         }`}
//       </style>
//     </>
//   );
// };

// export default PaidKnowledge;

<<<<<<< HEAD
import React, { useEffect } from "react";
import PaidResources from "../PaidResources";
=======
import React, { useEffect, useState } from "react";
import PaidResources from "../PaidResources";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 9999,
  pointerEvents: "none", // Allows clicks to pass through to elements below
};
>>>>>>> 513ccdd7469db6abdf9acd3117ee6d37fe5b8ead

const PaidKnowledge = () => {
  const [watermarkStyle, setWatermarkStyle] = useState({});

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

<<<<<<< HEAD
=======
    const addWatermark = () => {
      const watermark = document.createElement("div");
      watermark.innerText = "Confidential";
      watermark.style.position = "fixed";
      watermark.style.top = "50%";
      watermark.style.left = "50%";
      watermark.style.transform = "translate(-50%, -50%)";
      watermark.style.color = "rgba(255, 0, 0, 0.5)";
      watermark.style.fontSize = "50px";
      watermark.style.zIndex = "9999";
      watermark.style.pointerEvents = "none";
      watermark.style.animation = "moveWatermark 5s linear infinite";
      document.body.appendChild(watermark);
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
>>>>>>> 513ccdd7469db6abdf9acd3117ee6d37fe5b8ead
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keyup", handleKeyUp);
    const clipboardInterval = setInterval(accessClipboardData, 300);

    // Attempt to disable Windows + Shift + S
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "s") {
        e.preventDefault();
        alert("Screenshots are not allowed on this application.");
      }
    });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keyup", handleKeyUp);
      clearInterval(clipboardInterval);
    };
  }, []);

  return (
    <>
<<<<<<< HEAD
      <PaidResources />
=======
      <div
        style={{
          ...overlayStyle,
        }}></div>

      <PaidResources />
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable, .printable * {
              visibility: visible;
            }
            .printable {
              position: absolute;
              left: 0;
              top: 0;
            }
          }

          @keyframes moveWatermark {
            0% { transform: translate(-50%, -50%) translateX(0); }
            25% { transform: translate(-50%, -50%) translateX(100px); }
            50% { transform: translate(-50%, -50%) translateX(0); }
            75% { transform: translate(-50%, -50%) translateX(-100px); }
            100% { transform: translate(-50%, -50%) translateX(0); }
          }
        `}
      </style>
>>>>>>> 513ccdd7469db6abdf9acd3117ee6d37fe5b8ead
    </>
  );
};

export default PaidKnowledge;
