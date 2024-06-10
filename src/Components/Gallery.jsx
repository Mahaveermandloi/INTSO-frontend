import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { URLPath } from "../URLPath";
import Loader from "./Loader";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setLoadingMessage("Fetching gallery...");
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/gallery/getGallery`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setGallery(response.data);
        } else {
          toast.error("No token found");
        }
      } catch (error) {
        toast.error("Error fetching gallery images !!! ");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Please select an image file.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("gallery_img", selectedFile);
      formData.append("caption", caption);

      setLoading(true);
      setLoadingMessage("Uploading image...");

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${URLPath}/api/v1/gallery/postGallery`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Image uploaded successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Update the gallery state without reloading the page
          const newImage = {
            id: response.data.id, // Ensure this matches the ID in the response
            gallery_img: response.data.gallery_img, // Ensure this matches the image path in the response
          };
          setGallery((prevGallery) => [...prevGallery, newImage]);
          setSelectedFile(null); // Reset selected file
          setCaption(""); // Reset caption
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select an image file.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async (id) => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    
    };

    const confirmationToastId = toast.info(
      "Are you sure you want to delete the image?",
      {
        autoClose: 5000, // Disable auto close for confirmation toast
        closeOnClick: false,
        draggable: false,
        onClose: () => {
          toast.dismiss(confirmationToastId);
        },
        closeButton: <button onClick={confirmDeletion}>Confirm</button>,
      }
    );

    // Wait for the user to confirm
    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // If confirmed, proceed with the deletion
    if (isConfirmed) {
      setLoading(true);
      setLoadingMessage("Deleting image...");

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${URLPath}/api/v1/gallery/deleteGalleryImage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Image successfully deleted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setGallery((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          ); // Update the gallery state without reloading
        }
      } catch (error) {
        toast.error("Error deleting image. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMobileForm = () => {
    setIsMobileFormVisible(!isMobileFormVisible);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {loading && <Loader message={loadingMessage} />}
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Gallery</h1>
        </div>

        <div className="flex justify-around lg:gap-4">
          {/* Form for desktop view */}

          <div className="hidden lg:w-3/4 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery &&
                gallery.map(({ id, gallery_img }) => (
                  <div key={id} className="relative">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`${URLPath}${gallery_img}`}
                      alt={`Gallery image`}
                    />
                    <button
                      onClick={() => handleDelete(id)}
                      className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                    >
                      <RxCross1 size={30} className="p-1" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="hidden w-1/4 lg:flex h-full lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <div className="flex justify-center mb-4">
                      <img
                        className="rounded-lg h-40"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter caption (optional)"
              value={caption}
              onChange={handleCaptionChange}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <button
              className="mt-2 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Toggle button and form for mobile view */}
        <div className="lg:hidden m-2 flex flex-col gap-5">
          <button
            className="p-2 bg-[#ed1450] rounded-md text-white w-full font-bold"
            onClick={toggleMobileForm}
          >
            {isMobileFormVisible ? "Hide Form" : "Upload Image"}
          </button>

          {isMobileFormVisible && (
            <div className="  p-2 rounded-lg h-full border-2 shadow-lg">
              <div className="flex  items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedFile ? (
                      <div className="flex justify-center mb-4">
                        <img
                          className="rounded-lg h-40"
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="Enter caption (optional)"
                value={caption}
                onChange={handleCaptionChange}
                className="mt-2 p-2 border rounded-lg w-full"
              />

              <button
                className="w-full mt-2 text-white bg-[#ed1450] hover:bg-primary-700 font-medium text-md rounded-md px-5 py-2.5 text-center"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}

          <div className=" lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery &&
                gallery.map(({ gallery_img, id }) => (
                  <div key={id} className="relative">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`${URLPath}${gallery_img}`}
                      alt={`Gallery image`}
                    />
                    <button
                      onClick={() => handleDelete(id)}
                      className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                    >
                      <RxCross1 size={20} className="p-1" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
