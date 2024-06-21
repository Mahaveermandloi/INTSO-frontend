import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this line to import styles
import { URLPath, baseURL } from "../URLPath";
import { MdModeEdit } from "react-icons/md";
import Loader from "./Loader"; // Import Loader component

const NewsandUpdates = () => {
  const [event, setEvents] = useState([]);
  const [update, setUpdates] = useState([]);
  const [news, setNews] = useState([]);

  const [isFetching, setIsFetching] = useState(true); // Fetching loading state
  const [isUploading, setIsUploading] = useState(false); // Uploading loading state
  const [isDeleting, setIsDeleting] = useState(false); // Deleting loading state
  const [isUpdating, setIsUpdating] = useState(false); // Updating loading state

  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const [updateselectedOption, setUpdateSelectedOption] = useState("");
  const [updatetitle, setUpdateTitle] = useState("");
  const [updatedescription, setUpdateDescription] = useState("");
  const [updatepostedBy, setUpdatePostedBy] = useState("");
  const [updateeventDate, setUpdateEventDate] = useState("");
  const [updateeventTime, setUpdateEventTime] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModal, setIsUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          `${URLPath}/api/v1/newsandupdates/get-news-and-updates`,
          {
            headers: {
              api_key: "ajeet",
            },
          }
        );

        const news = response.data.data.newsArray;
        const event = response.data.data.EventAndExamArray;
        const update = response.data.data.updateArray;

        setNews(news);
        setUpdates(update);
        setEvents(event);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false); // Reset fetching state
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleUpload = async (event) => {
    event.preventDefault();

    setIsUploading(true);

    if (selectedFile && title && description) {
      const formData = new FormData();

      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("posted_By", postedBy);
      formData.append("post_Type", selectedOption);
      formData.append("event_Date", eventDate);
      formData.append("event_Time", eventTime);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${URLPath}/api/v1/newsandupdates/upload-news-and-updates`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          toast.success("News and update uploaded successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setIsModalOpen(!isModalOpen);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error uploading news and update:", error);
        toast.error("Error uploading image. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setIsUploading(false); // Reset uploading state
      }
    } else {
      toast.error("Please fill in all required fields.", {
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
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${URLPath}/api/v1/newsandupdates/delete-news-and-updates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("News deleted successfully!!!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setNews((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );
          setUpdates((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );
          setEvents((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );

          // setNews(news);
          // setUpdates(update);
          // setEvents(event);
        }
      } catch (error) {
        toast.error("Error deleting blogs. Please try again.", {
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
      }
    }
  };

  const handleUpdate = async (id) => {
    setIsUpdating(true);
    setIsUpdateModal(true);
    setUpdateId(id);

    try {
      const response = await axios.get(
        `${URLPath}/api/v1/newsandupdates/get-news/${id}`
      );

      const data = response.data.data.newsUpdate;
      setUpdateSelectedOption(data.post_Type);
      setUpdateTitle(data.title);
      setUpdateDescription(data.description);
      setUpdatePostedBy(data.posted_By);
      setUpdateEventDate(data.event_Date || "");
      setUpdateEventTime(data.event_Time || "");
    } catch (error) {
      console.error("Error fetching update data:", error);
    } finally {
      setIsUpdating(false); // Reset updating state
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    if (updatetitle && updatedescription) {
      setIsUpdating(true);
      const formData = new FormData();

      formData.append("title", updatetitle);
      formData.append("description", updatedescription);
      formData.append("posted_By", updatepostedBy);
      formData.append("post_Type", updateselectedOption);
      formData.append("event_Date", updateeventDate);
      formData.append("event_Time", updateeventTime);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(
          `${URLPath}/api/v1/newsandupdates/update-news-and-updates/${updateId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("News updated successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating news:", error);
        toast.error("Error updating news. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setIsUpdating(false); // Reset updating state
      }
    } else {
      toast.error("Please fill in all required fields.", {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl my-5 font-bold">
              News, Events, Updates, Exam
            </h1>
          </div>
          <div>
            <button
              onClick={toggleModal}
              className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create
            </button>
          </div>
        </div>

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

        {isFetching ? (
          <Loader message={"Loading"} /> // Fetching Loader
        ) : (
          <div className="lg:flex flex-col   lg:flex-row lg:space-x-4  ">
            {/* News Section */}

            <div className=" lg:w-1/3  border-2 border-gray-500  p-4 rounded-lg shadow-lg mb-4 max-h-[420px]  overflow-auto lg:max-h-[76vh]  lg:mb-0 custom-scrollbar ">
              <h2 className=" text-xl font-bold mb-2 text-red-600">News</h2>

              <div className="overflow-y-auto h-[90%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                  >
                    <img
                      src={`${URLPath}${item.image}`}
                      alt="NEWS"
                      className="w-full"
                    />
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}
                      >
                        <RxCross1 className="p-1" size={30} />
                      </button>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-green-500 rounded-full"
                      >
                        <MdModeEdit className="p-1" size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EVENT AND EXAM */}
            <div className=" lg:w-1/3  border-2 border-gray-500  p-4 rounded-lg shadow-lg mb-4 max-h-[420px] overflow-auto lg:max-h-[76vh]  lg:mb-0 custom-scrollbar">
              <h2 className="text-xl font-bold mb-2 text-red-600">
                Events and Exam
              </h2>

              <div className="overflow-y-auto h-[95%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {event.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                  >
                    <img
                      src={`${URLPath}${item.image}`}
                      alt="NEWS"
                      className="w-full"
                    />
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}
                      >
                        <RxCross1 className="p-1" size={30} />
                      </button>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-green-500 rounded-full"
                      >
                        <MdModeEdit className="p-1" size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPDATES */}
            <div className="  lg:w-1/3  border-2 border-gray-500  p-4 rounded-lg shadow-lg mb-4 max-h-[420px] overflow-auto lg:max-h-[76vh]  lg:mb-0 custom-scrollbar">
              <h2 className="text-xl font-bold mb-2 text-red-600">Update</h2>

              <div className="overflow-y-auto h-[95%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {update.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1"
                  >
                    <img
                      src={`${URLPath}${item.image}`}
                      className="w-full"
                      alt="NEWS"
                    />
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}
                      >
                        <RxCross1 className="p-1" size={30} />
                      </button>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-green-500 rounded-full"
                      >
                        <MdModeEdit className="p-1" size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isUploading ? (
        <Loader message={"Uploading"} />
      ) : (
        isModalOpen && (
          <div className="fixed mt-16 bg-black inset-0 flex items-center justify-center bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <div>
                <h2 className="text-2xl font-bold mb-4">Create New Entry</h2>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  ></textarea>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="postedBy"
                  >
                    Posted By
                  </label>
                  <input
                    type="text"
                    id="postedBy"
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="type"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="news">News</option>
                    <option value="event">Event</option>
                    <option value="update">Update</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>

                {(selectedOption === "event" || selectedOption === "exam") && (
                  <>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="eventDate"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="eventTime"
                      >
                        Event Time
                      </label>
                      <input
                        type="time"
                        id="eventTime"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 rounded bg-gray-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Upload
                </button>

                <button
                  type="button"
                  onClick={toggleModal}
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )
      )}

      {/* This is update Model */}
      {isUpdating ? (
        <Loader message={"Updating..."} />
      ) : (
        updateModal && (
          <div className="fixed mt-12 bg-black inset-0 flex items-center justify-center bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <div>
                <h2 className="text-2xl font-bold mb-4">Update the News</h2>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="updatetitle"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="updatetitle"
                    value={updatetitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="updatedescription"
                  >
                    Description
                  </label>
                  <textarea
                    id="updatedescription"
                    value={updatedescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  ></textarea>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="updatepostedBy"
                  >
                    Posted By
                  </label>
                  <input
                    type="text"
                    id="updatepostedBy"
                    value={updatepostedBy}
                    onChange={(e) => setUpdatePostedBy(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="updatetype"
                  >
                    Type
                  </label>
                  <select
                    id="updatetype"
                    value={updateselectedOption}
                    onChange={(e) => setUpdateSelectedOption(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="news">News</option>
                    <option value="event">Event</option>
                    <option value="update">Update</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>

                {(updateselectedOption === "event" ||
                  updateselectedOption === "exam") && (
                  <>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="updateeventDate"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="updateeventDate"
                        value={updateeventDate}
                        onChange={(e) => setUpdateEventDate(e.target.value)}
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="updateeventTime"
                      >
                        Event Time
                      </label>
                      <input
                        type="time"
                        id="updateeventTime"
                        value={updateeventTime}
                        onChange={(e) => setUpdateEventTime(e.target.value)}
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="updateimage"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="updateimage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 rounded bg-gray-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsUpdateModal(false);
                  }}
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewsandUpdates;
