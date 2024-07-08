import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { URLPath, API_KEY, baseURL } from "../URLPath";
import Loader from "./Loader";
import { FaPlus } from "react-icons/fa";
import img from "../assets/9214833.jpg";
import { FaFolder } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const ImageCatogary = () => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ImageCatogary, setImageCatogary] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const handleCreate = () => {
    setShowCreateForm(true); // Display the pop-up form
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false); // Close the pop-up form
  };

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setLoadingMessage("Fetching gallery...");
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/gallery/get-catogry`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                api_key: API_KEY,
              },
            }
          );

          setAlbum(response.data.data);
          console.log(response.data.data);
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

  const handleCaptionChange = (event) => {
    setImageCatogary(event.target.value);
  };
  const handleUpload = async () => {
    if (ImageCatogary) {
      const formData = new FormData();
      formData.append("album", ImageCatogary);

      setLoading(true);
      setLoadingMessage("Creating category...");

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${URLPath}/api/v1/gallery/create-Catogary`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);
        console.log("Response data:", response.data); // Log response data for debugging

        if (response.status === 201) {
          toast.success("Category created successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const newCategory = {
            id: response.data.data.id,
            album: response.data.data.album,
          };

          setAlbum((prevGallery) => [...prevGallery, newCategory]);

          setImageCatogary(""); // Reset category input
        }
      } catch (error) {
        console.error("Error creating category:", error);
        toast.error("Error creating category. Please try again.", {
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
      toast.error("Please enter a category.", {
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
          `${URLPath}/api/v1/gallery/deleteAlbum/${id}`,
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
          setAlbum((prevGallery) =>
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
      {loading && <Loader message={loadingMessage} />}
      <div className="lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Album</h1>
        </div>

        <div className="flex justify-around lg:gap-4">
          {/* Form for desktop view */}

          <div className="hidden lg:w-3/4 lg:flex lg:flex-col lg:items-start lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 h-[580px] lg:rounded-lg lg:shadow-lg overflow-y-scroll">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {album.length === 0 ? (
                <>
                  <img src={img} alt="" />
                </>
              ) : (
                <>
                  {album.map(({ id, album }) => (
                    <div key={id} className="relative">
                      <div>
                        <Link to={`${baseURL}/gallery/${id}`}>
                          <FaFolder className="text-yellow-500 size-20" />
                          <h1>{album}</h1>
                        </Link>
                      </div>

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

          {/* Create Button */}
          <div className="w-1/6 lg:flex h-full lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <button
              className="mt-2 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold flex justify-evenly  items-center"
              onClick={handleCreate}
            >
              Create
              <FaPlus />
            </button>
          </div>

          {showCreateForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Create Album</h2>
                <input
                  type="text"
                  placeholder="Enter Album name"
                  value={ImageCatogary}
                  onChange={handleCaptionChange}
                  className="mt-2 p-2 border rounded-md w-full"
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                    onClick={handleCloseCreateForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#ed1456] px-4 py-2 text-white rounded-md"
                    onClick={handleUpload}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toggle button and form for mobile view */}
        <div className="lg:hidden m-2 flex flex-col  overflow-y-scroll h-[460px] rounded-lg border-2 border-gray-300 p-2  gap-5">
          {showCreateForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-8 z-60">
                <h2 className="text-2xl font-bold mb-4">Create Album</h2>
                <input
                  type="text"
                  placeholder="Enter Album name"
                  value={ImageCatogary}
                  onChange={handleCaptionChange}
                  className="mt-2 p-2 border rounded-md w-full"
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                    onClick={handleCloseCreateForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#ed1456] px-4 py-2 text-white rounded-md"
                    onClick={handleUpload}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className=" lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {album.length === 0 ? (
                <>
                  <img src={img} alt="" />
                </>
              ) : (
                <>
                  {album.map(({ album, id }) => (
                    <div key={id} className="relative">
                      <div>
                        <FaFolder className="text-yellow-500 size-20" />
                        <h1>{album}</h1>
                      </div>
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

export default ImageCatogary;
