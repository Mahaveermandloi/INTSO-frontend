import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Loader from "./Loader"; // Importing the Loader component
import nodata from "../assets/9214833.jpg";

import { URLPath, API_KEY } from "../URLPath";

const Banner = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const fetchGallery = async () => {
    try {
      setLoading(true); // Start loading
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const response = await axios.get(
          `${URLPath}/api/v1/banner/getBannerData`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              api_key: API_KEY, // Replace 'api_key' with your actual API key variable
            },
          }
        );
        // Handle response

        setGallery(response.data.data);
      
      } else {
        toast.error("No access token found");
      }
    } catch (error) {
      toast.info("Error fetching banner data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Please select an image file.", {
        // Toast notification for error
      });
    }
  };

  const handleUpload = async () => {
    if (selectedFile && title && description && link) {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${URLPath}/api/v1/banner/upload-banner-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          // Check for 201 status code
          toast.success("Banner uploaded successfully!");

          setSelectedFile(null);
          setTitle("");
          setDescription("");
          setLink("");

          // Update the gallery state without reloading the page
          const newBanner = {
            id: response.data.data.id,
            image: response.data.data.image,
            title: response.data.data.title,
            description: response.data.data.description,
            link: response.data.data.link,
          };

          setGallery((prevGallery) => [...prevGallery, newBanner]);
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      toast.error("Please fill in all required fields.");
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
        autoClose: 5000,
        closeOnClick: false,
        draggable: false,
        onClose: () => {
          toast.dismiss(confirmationToastId);
        },
        closeButton: (
          <button
            onClick={confirmDeletion}
            className="bg-blue-400 p-2 text-white rounded-lg h-10 ml-4 mt-3"
          >
            Confirm
          </button>
        ),
      }
    );

    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (isConfirmed) {
      setLoading(true);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${URLPath}/api/v1/banner/delete-banner-image/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Banner successfully deleted", {
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
          );
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
      {loading && <Loader message="Loading..." />} {/* Loader */}
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Banner</h1>
        </div>

        <div className="flex justify-around lg:gap-4">
          {/* Form for desktop view */}

          <div className="hidden lg:w-3/4 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.length === 0 ? (
                <>
                  <img src={nodata} alt="" />
                </>
              ) : (
                <>
                  {gallery.map(({ id, image, link }) => (
                    <div key={id} className="relative">
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={`${URLPath}${image}`}
                        alt={`Gallery image ${id}`}
                      />

                      <button
                        onClick={() => handleDelete(id)}
                        className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                      >
                        <RxCross1 size={30} className="p-1" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="hidden w-1/4 lg:flex  lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="flex items-center justify-center w-full">
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
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
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
        <div className="lg:hidden m-2 flex flex-col gap-2">
          <button
            className="p-2 bg-[#ed1450] rounded-md text-white w-full font-bold"
            onClick={toggleMobileForm}
          >
            {isMobileFormVisible ? "Hide Form" : "Upload Image"}
          </button>

          {isMobileFormVisible && (
            <div className="mt-2 p-2 border-2  h-full rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-full">
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
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Enter link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                required
              />

              <button
                className="w-full text-white mt-2 bg-[#ed1450] hover:bg-primary-700 font-medium text-md rounded-md px-5 py-2.5 text-center"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}

          <div className=" lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.length === 0 ? (
                <>
                  <img src={nodata} alt="" />
                </>
              ) : (
                <>
                  {gallery.map(({ id, image }) => (
                    <div className="relative" key={id}>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={`${URLPath}${image}`}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
