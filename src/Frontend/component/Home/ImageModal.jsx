import React, { useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ImageModal = ({
  isOpen,
  closeModal,
  imageSrc,
  showPreviousImage,
  showNextImage,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          showPreviousImage();
          break;
        case "ArrowRight":
          showNextImage();
          break;
        case "Escape":
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showPreviousImage, showNextImage, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 "
      onClick={closeModal}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          showPreviousImage();
        }}
        className="px-4 py-2 text-white rounded">
        <KeyboardArrowLeftIcon />
      </button>
      <div
        className="relative p-4 rounded"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-black">
          &times;
        </button>
        <img
          src={imageSrc}
          alt="Gallery"
          className="max-w-full max-h-screen"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          showPreviousImage();
        }}
        className="px-4 py-2 text-white rounded">
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default ImageModal;
