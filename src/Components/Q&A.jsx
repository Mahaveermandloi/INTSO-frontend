import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this line to import styles
import { URLPath, baseURL } from "../URLPath";
import { MdModeEdit } from "react-icons/md";
import Loader from "./Loader"; // Import Loader component

const QandAns = () => {
  const [gkData, setGkData] = useState([]);
  const [formula, setFormula] = useState([]);
  const [grammer, setGrammer] = useState([]);

  const [isFetching, setIsFetching] = useState(true); // Fetching loading state
  const [isUploading, setIsUploading] = useState(false); // Uploading loading state
  const [isDeleting, setIsDeleting] = useState(false); // Deleting loading state
  const [isUpdating, setIsUpdating] = useState(false); // Updating loading state

  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
          `${URLPath}/api/v1/Q&A/getData-by-admin`,
          {
            headers: {
              api_key: "ajeet",
            },
          }
        );

        const gkdata = response.data.data.GkAndCurrentAffairs;
        const formula = response.data.data.Definitionandformula;
        const grammer = response.data.data.EnglishGrammar;

        setGkData(gkdata);
        setFormula(formula);
        setGrammer(grammer);
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

    if (title && description && selectedOption) {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      formData.append("question", title);
      formData.append("answer", description);
      formData.append("post_Type", selectedOption);

      console.log("jecdbf", title, description, selectedOption);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${URLPath}/api/v1/Q&A/upload-ques-and-ans`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Uncomment if needed
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Data uploaded successfully!", {
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
        console.error("Error uploading data:", error);
        if (error.response) {
          console.error("Server response:", error.response.data);
        }
        toast.error("Error uploading data. Please try again.", {
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
      setIsUploading(false); // Reset uploading state if validation fails
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
            className="bg-blue-400 p-2 text-white rounded-lg h-10 ml-4 mt-3">
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
          `${URLPath}/api/v1/Q&A/delete-ques-and-ans/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("deleted successfully!!!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setGkData((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );
          setFormula((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );
          setGrammer((prevGallery) =>
            prevGallery.filter((item) => item.id !== id)
          );

          // setNews(news);
          // setUpdates(update);
          // setEvents(event);
        }
      } catch (error) {
        toast.error("Error deleting . Please try again.", {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl lg:text-2xl my-5 font-semibold">
              GK & Current Affairs, Std. Definition and formula, English grammar
            </h1>
          </div>
          <div>
            <button
              onClick={toggleModal}
              className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
              <h2 className=" text-xl font-bold mb-2 text-red-600">GkData</h2>

              <div className="overflow-y-auto h-[90%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {gkData.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1">
                    {item.image && (
                      <img
                        src={`${URLPath}${item.image}`}
                        alt="formula"
                        className="w-full"
                      />
                    )}
                    <h3 className="text-md font-semibold">{item.question}</h3>
                    <p>{item.answer}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}>
                        <RxCross1 className="p-1" size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula */}
            <div className=" lg:w-1/3  border-2 border-gray-500  p-4 rounded-lg shadow-lg mb-4 max-h-[420px] overflow-auto lg:max-h-[76vh]  lg:mb-0 custom-scrollbar">
              <h2 className="text-xl font-bold mb-2 text-red-600">Formula</h2>

              <div className="overflow-y-auto h-[95%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {formula.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1">
                    {item.image && (
                      <img
                        src={`${URLPath}${item.image}`}
                        alt="formula"
                        className="w-full"
                      />
                    )}
                    <h3 className="text-md font-semibold">{item.question}</h3>
                    <p>{item.answer}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}>
                        <RxCross1 className="p-1" size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammer */}
            <div className="  lg:w-1/3  border-2 border-gray-500  p-4 rounded-lg shadow-lg mb-4 max-h-[420px] overflow-auto lg:max-h-[76vh]  lg:mb-0 custom-scrollbar">
              <h2 className="text-xl font-bold mb-2 text-red-600">Grammer</h2>

              <div className="overflow-y-auto h-[95%] custom-scrollbar">
                {/* Adjust the height as needed */}
                {grammer.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border-2 border-gray-200 rounded-lg p-1">
                    {item.image && (
                      <img
                        src={`${URLPath}${item.image}`}
                        alt="formula"
                        className="w-full"
                      />
                    )}
                    <h3 className="text-md font-semibold">{item.question}</h3>
                    <p>{item.answer}</p>
                    <div className="flex gap-3">
                      <button
                        className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
                        onClick={() => handleDelete(item.id)}>
                        <RxCross1 className="p-1" size={30} />
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
                    htmlFor="title">
                    Question
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
                    htmlFor="description">
                    Answer
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required></textarea>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                    required>
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="GK & Current Affairs">
                      GK & Current Affairs
                    </option>
                    <option value="Std. Definition and Formula">
                      Std. Definition and Formula
                    </option>
                    <option value="English Grammar">English Grammar</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="image">
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
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600">
                  Upload
                </button>

                <button
                  type="button"
                  onClick={toggleModal}
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600">
                  Close
                </button>
              </form>
            </div>
          </div>
        )
      )}
      {/* This is update Model */}
    </>
  );
};

export default QandAns;
