import React, { useState, useEffect } from "react";
import img from "../../assets/9214833.jpg";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Loader from "../Loader"; // Assuming Loader component is in the same directory
import { URLPath, baseURL } from "../../URLPath";
import { RxCross1 } from "react-icons/rx";
const Image = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  const [resource_class, setClass] = useState(null);
  const [filter, setFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const handleClassChange = (event) => {
    const which_class = event.target.value
      ? parseInt(event.target.value, 10)
      : null;
    setClass(which_class);
    fetchdata(selectedOption, which_class);
  };

  const fetchdata = async (option, which_class) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          `${URLPath}/api/v1/resource/get-all-data-by-admin`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const imageResources = response.data.data.resourcesData.filter(
          (resource) => resource.resource_type === "image"
        );
        let filteredData = imageResources;
        if (option === "free") {
          filteredData = filteredData.filter((item) => !item.is_paid);
        } else if (option === "paid") {
          filteredData = filteredData.filter((item) => item.is_paid);
        }
        if (which_class !== null && !isNaN(which_class)) {
          filteredData = filteredData.filter(
            (item) => item.resource_class === which_class
          );
        }
        setData(filteredData);
      } else {
        toast.error("No access token found");
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleFreeButtonClick = () => {
    setSelectedOption("free");
    fetchdata("free", resource_class);
  };

  const handlePaidButtonClick = () => {
    setSelectedOption("paid");
    fetchdata("paid", resource_class);
  };

  const handleAll = () => {
    setSelectedOption("all");
    fetchdata("all", resource_class); // This should not affect the filtered data due to changes in fetchdata
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Please select an image file.");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (
      selectedOption === "all" ||
      (selectedOption !== "free" && selectedOption !== "paid")
    ) {
      toast.error("Please choose either PAID or FREE.");
      setLoading(false);
      return;
    }

    if (selectedFile && title && description) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("resource_class", resource_class);
      formData.append("resource_url", resourceURL);
      formData.append("resource_type", "image");

      // Determine is_paid based on selectedOption
      formData.append("is_paid", selectedOption === "paid");

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${URLPath}/api/v1/resource/create-resource`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Image uploaded successfully!");
          setData((prevData) => [...prevData, response.data.data]);
          setSelectedFile(null);
          setTitle("");
          setDescription("");
          setResourceURL("");
        }
        window.location.reload();
      } catch (error) {
        toast.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields.");
      setLoading(false);
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
          `${URLPath}/api/v1/resource/delete-resource/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Image successfully deleted");
          setData((prevdata) => prevdata.filter((item) => item.id !== id));
        }
      } catch (error) {
        toast.error("Error deleting image:", error);
        toast.error("Error deleting image");
      } finally {
        setLoading(false); // Set loading state to false after deletion attempt
      }
    }
  };
  const toggleMobileForm = () => {
    setIsMobileFormVisible(!isMobileFormVisible);
  };

  return (
    <>
      {loading && <Loader message="Please wait..." />}{" "}
      {/* Render loader if loading state is true */}
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
      <div className="lg:w-10/12 lg:ml-auto ">
        <div className=" lg:flex justify-between items-center  ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold">Images</h1>
            </div>
          </div>

          <div className="hidden  mt-2 lg:flex justify-center gap-2 ">
            <div className="lg:w-96 ">
              <select
                id="countries"
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 "
                onChange={handleClassChange}
              >
                <option selected>Choose a class</option>
                <option value="1" className="text-center ">
                  1
                </option>
                <option value="2" className="text-center ">
                  2
                </option>
                <option value="3" className="text-center ">
                  3
                </option>
                <option value="4" className="text-center ">
                  4
                </option>
                <option value="5" className="text-center ">
                  5
                </option>
                <option value="6" className="text-center ">
                  6
                </option>
                <option value="7" className="text-center ">
                  7
                </option>
                <option value="8" className="text-center ">
                  8
                </option>
                <option value="9" className="text-center ">
                  9
                </option>
                <option value="10" className="text-center ">
                  10
                </option>
              </select>
            </div>
            <button
              onClick={handleAll}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "all" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={handleFreeButtonClick}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "free" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              Free
            </button>
            <button
              onClick={handlePaidButtonClick}
              className={`p-2 rounded-md w-1/2 font-bold ${
                selectedOption === "paid" ? "bg-green-500" : "bg-slate-200"
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-around lg:gap-4">
          {/* Form for desktop view */}
          <div className="hidden overflow-y-scroll  h-[580px] border-2 border-gray-400 p-2  rounded-lg lg:w-1/2 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            {/* data display */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.length === 0 ? (
                <div className="col-span-2 md:col-span-3 text-center text-gray-500">
                  <img src={img} className="w-1/2" alt="" />
                </div>
              ) : (
                data.map(({ id, resource_url, resource_class }) => {
                  return (
                    <div key={id} className="relative">
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={`${URLPath}${resource_url}`}
                        alt={`data image ${id}`}
                      />
                      <div className="absolute top-2 left-2 text-black bg-white  p-1 rounded-full">
                        {resource_class}
                      </div>
                      <button
                        onClick={() => handleDelete(id)}
                        className="absolute top-2 right-2 bg-[#ed1450] text-white p-1 rounded-full"
                      >
                        <RxCross1 size={30} className="p-1" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Form for both desktop and mobile view */}
          <div className="w-full  lg:w-1/2 flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
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

            {/* Form fields */}
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
              required
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            >
              <option>Choose PAID or FREE</option>
              <option value="paid">PAID</option>
              <option value="free">FREE</option>
            </select>

            <select
              value={resource_class}
              onChange={(e) => setClass(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            >
              <option value="">Select the class</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

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
              placeholder="Resource URL"
              value={resourceURL}
              onChange={(e) => setResourceURL(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            />

            <button
              className="mt-4 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Toggle button and form for mobile view */}

        <div className="lg:hidden overflow-y-scroll  h-[470px] border-2 border-gray-400 p-2  rounded-lg m-2 flex flex-col gap-2">
          <div className="flex">
            <button
              className="p-2 bg-[#ed1450] rounded-md text-white w-full font-bold"
              onClick={() => setFilter(!filter)}
            >
              {filter ? "Hide Filter" : "Open filter"}
            </button>

            <button
              className="p-2 bg-[#ed1450] rounded-md text-white w-full font-bold"
              onClick={toggleMobileForm}
            >
              {isMobileFormVisible ? "Hide Form" : "Upload Image"}
            </button>
          </div>

          {filter && (
            <div className=" mt-2 lg:flex justify-center gap-2 ">
              <div className="lg:w-96 ">
                <select
                  id="countries"
                  className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 "
                  onChange={handleClassChange}
                >
                  <option selected>Choose a class</option>
                  <option value="1" className="text-center ">
                    1
                  </option>
                  <option value="2" className="text-center ">
                    2
                  </option>
                  <option value="3" className="text-center ">
                    3
                  </option>
                  <option value="4" className="text-center ">
                    4
                  </option>
                  <option value="5" className="text-center ">
                    5
                  </option>
                  <option value="6" className="text-center ">
                    6
                  </option>
                  <option value="7" className="text-center ">
                    7
                  </option>
                  <option value="8" className="text-center ">
                    8
                  </option>
                  <option value="9" className="text-center ">
                    9
                  </option>
                  <option value="10" className="text-center ">
                    10
                  </option>
                </select>
              </div>
              <button
                onClick={handleAll}
                className={`p-2 rounded-md w-1/2 font-bold ${
                  selectedOption === "all" ? "bg-green-500" : "bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={handleFreeButtonClick}
                className={`p-2 rounded-md w-1/2 font-bold ${
                  selectedOption === "free" ? "bg-green-500" : "bg-slate-200"
                }`}
              >
                Free
              </button>
              <button
                onClick={handlePaidButtonClick}
                className={`p-2 rounded-md w-1/2 font-bold ${
                  selectedOption === "paid" ? "bg-green-500" : "bg-slate-200"
                }`}
              >
                Paid
              </button>
            </div>
          )}

          {isMobileFormVisible && (
            <div className="flex justify-around lg:gap-4">
              {/* Form for desktop view */}
              <div className="hidden lg:w-1/2 lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
                {/* data display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data &&
                    data.map(({ id, resource_url, is_paid }) => (
                      <div key={id} className="relative">
                        <img
                          className="h-auto max-w-full rounded-lg"
                          src={`${URLPath}${resource_url}`}
                          alt={`data image ${id}`}
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

              {/* Form for both desktop and mobile view */}
              <div className="w-full lg:w-1/2 flex flex-col items-center mt-5 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
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
                            <span className="font-semibold">
                              Click to upload
                            </span>
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

                {/* Form fields */}
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                  required
                />
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                >
                  <option>Choose PAID or FREE</option>
                  <option value="paid">PAID</option>
                  <option value="free">FREE</option>
                </select>

                <select
                  value={resource_class}
                  onChange={(e) => setClass(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                >
                  <option value="">Select the class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>

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
                  placeholder="Resource URL"
                  value={resourceURL}
                  onChange={(e) => setResourceURL(e.target.value)}
                  className="mt-2 p-2 border rounded-lg w-full"
                />

                {/* Submit button */}
                <button
                  className="mt-4 p-2 bg-[#ed1456] text-white rounded-md w-full font-bold"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          )}

          {/* data display for mobile */}

          <div className="lg:flex lg:flex-col lg:items-end lg:mt-5 lg:p-5 lg:border-2 lg:border-gray-400 lg:rounded-lg lg:shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.length === 0 ? (
                <div className="col-span-2 md:col-span-3 text-center text-gray-500">
                  <img src={img} className="w-1/2" alt="" />
                </div> ):
                
                data.map(({ id, resource_url }) => (
                  <div key={id} className="relative">
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={`${URLPath}${resource_url}`}
                      alt={`data image ${id}`}
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
        </div>
      </div>
    </>
  );
};

export default Image;
