import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { URLPath, baseURL } from "../URLPath";

const CreateCareer = () => {
  const [jobRole, setJobRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isPostingCareer, setIsPostingCareer] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    event.preventDefault();
    if (jobRole && jobType && jobLocation && jobDescription) {
      const careerData = {
        job_role: jobRole,
        job_type: jobType,
        job_location: jobLocation,
        job_description: jobDescription,
      };

      try {
        const accessToken = localStorage.getItem("accessToken");
        setIsPostingCareer(true); // Set loading state for career posting
        const response = await axios.post(
          `${URLPath}/api/v1/career/post-career-with-us`,
          careerData
        );

        if (response.status === 200) {
          toast.success("Career uploaded successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setJobRole("");
          setJobType("");
          setJobLocation("");
          setJobDescription("");

          setTimeout(() => {
            navigate(`${baseURL}/careerList`);
          }, 1000);
        }
      } catch (error) {
        console.error("Error uploading career:", error);
        toast.error("Error while uploading", {
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
        setIsPostingCareer(false); // Reset loading state for career posting
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
      {isPostingCareer && <Loader message="Posting career..." />}
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Careers</h1>
          </div>
        </div>

        <div className="flex">
          <div className="w-full p-2 flex items-center bg-opacity-75">
            <div className="w-full p-3 lg:p-3 bg-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Post a Career</h2>
              </div>

              <form
                onSubmit={handleUpload}
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
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      className="w-full p-2 rounded bg-gray-100"
                      required
                    />
                  </div>

                  <div className="w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="job_type"
                    >
                      Job Type
                    </label>
                    <input
                      type="text"
                      id="job_type"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
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
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="job_description"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="job_description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ed1450] text-white p-2 rounded hover:bg-red-600"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCareer;
