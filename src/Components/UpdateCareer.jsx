import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Editor from "./Editor";
import { useNavigate, useParams } from "react-router-dom";
import { URLPath, baseURL } from "../URLPath";
const UpdateCareer = () => {
  const [careerData, setBlogData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlogData = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${URLPath}/api/v1/career/edit-career-details/${id}`
          );
          const { job_role, job_type, job_location, job_description } =
            response.data.data.data;
          console.log("Career Data", response.data.data.data);
          setBlogData({
            job_role,
            job_type,
            job_location,
            job_description,
          });
        } catch (error) {
          console.error("Error fetching blog data:", error);
          toast.error("Error fetching blog data", {
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
        }
      };
      fetchBlogData();
    }
  }, [id]);

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

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const formData = new FormData();

  //       formData.append("job_role", careerData.job_role);
  //       formData.append("job_type", careerData.job_type);
  //       formData.append("job_location", careerData.job_location);
  //       formData.append("job_description", careerData.job_description);

  //       const accessToken = localStorage.getItem("accessToken");
  //       const response = await axios.put(
  //         `${URLPath}/api/v1/career/edit-career-with-us/${id}`,
  //         formData,
  //         {
  //           headers: {
  //             // Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         toast.success("Blog updated successfully!", {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });

  //         setTimeout(() => {
  //           navigate(`${baseURL}/blog`);
  //         }, 1000);
  //       }
  //     } catch (error) {
  //       console.error("Error updating blog:", error);
  //       toast.error("Error updating blog", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedCareerData = {
        job_role: careerData.job_role,
        job_type: careerData.job_type,
        job_location: careerData.job_location,
        job_description: careerData.job_description,
      };

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${URLPath}/api/v1/career/edit-career-with-us/${id}`,
        updatedCareerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Uncomment if using authentication
          },
        }
      );

      if (response.status === 200) {
        toast.success("Career updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate(`${baseURL}/careerList`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating career:", error);
      toast.error("Error updating career", {
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
    }
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
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center flex-col">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Update Career</h1>
          </div>

          <div className="flex w-full">
            <div className="w-full p-2 flex items-center bg-opacity-75">
              <div className="w-full p-3 lg:p-3 bg-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold mb-4">Update Career</h2>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 flex flex-col justify-center"
                >
                  <div className="flex justify-between gap-10">
                    <div className="w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="job_role"
                      >
                        Job Role
                      </label>
                      <input
                        type="text"
                        id="job_role"
                        value={careerData.job_role}
                        onChange={(e) =>
                          setBlogData((prevData) => ({
                            ...prevData,
                            job_role: e.target.value,
                          }))
                        }
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="job_role"
                      >
                        Job Type
                      </label>
                      <input
                        type="text"
                        id="job_type"
                        value={careerData.job_type}
                        onChange={(e) =>
                          setBlogData((prevData) => ({
                            ...prevData,
                            job_type: e.target.value,
                          }))
                        }
                        className="w-full p-2 rounded bg-gray-100"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="job_location"
                    >
                      Job Location
                    </label>
                    <input
                      type="text"
                      id="job_location"
                      value={careerData.job_location}
                      onChange={(e) =>
                        setBlogData((prevData) => ({
                          ...prevData,
                          job_location: e.target.value,
                        }))
                      }
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <div className="">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="job_location"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="job_description"
                      value={careerData.job_description}
                      onChange={(e) =>
                        setBlogData((prevData) => ({
                          ...prevData,
                          job_description: e.target.value,
                        }))
                      }
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                  >
                    Update Career
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCareer;
