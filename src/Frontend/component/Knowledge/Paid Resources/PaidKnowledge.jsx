import React, { useEffect } from "react";
import PaidResources from "../PaidResources";

const PaidKnowledge = () => {
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen") {
        alert("Screenshots are not allowed on this application.");
      }
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "p") {
        alert("Printing is not allowed on this application.");
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

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
      document.body.appendChild(watermark);
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("DOMContentLoaded", addWatermark);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("DOMContentLoaded", addWatermark);
    };
  }, []);

  return (
    <>
      <PaidResources />
      {/* Additional styles to hide content when printing */}
    </>
  );
};

export default PaidKnowledge;
