import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URLPath } from "../../URLPath";

import { FaFileDownload } from "react-icons/fa";

const UploadStudent = () => {
  const [selectedSchoolName, setSelectedSchoolName] = useState("");
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSchoolNameChange = (event) => {
    const which_school = event.target.value;
    setSelectedSchoolName(which_school);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // download a excel file including 
      const schoolResponse = await axios.get(
        `${URLPath}/api/v1/school/get-approved-schools`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(schoolResponse.data);
      if (schoolResponse.status === 200) {
        setSchoolNameList(schoolResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const makeDownload = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${URLPath}/api/v1/studentList/downloadFormat`,
        {
          responseType: "blob", // Important
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Create blob link to download
      toast.success("Excel downloaded successfully");

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "format.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error("Error downloading Excel");
    }
  };

  const uploadStudentData = async () => {
    if (!selectedSchoolName || !selectedFile) {
      toast.error("Please select a school and a file to upload.");
      return;
    }

    // Ask for confirmation before proceeding using a toast message
    const confirmationToastId = toast.info(
      "ARE YOU SURE YOU WANT TO UPLOAD STUDENT DATA ? ( THIS CHANGE IS IRREVERSIBLE ) ",
      {
        autoClose: false, // Disable auto close for confirmation toast
        closeOnClick: false,
        draggable: false,

        onClose: () => {
          toast.dismiss(confirmationToastId);
        },
        closeButton: (
          <button
            onClick={() => {
              toast.dismiss(confirmationToastId);
              proceedWithUpload();
            }}
          >
            Confirm
          </button>
        ),
      }
    );

    const proceedWithUpload = async () => {
      const formData = new FormData();
      formData.append("school_name", selectedSchoolName);
      formData.append("file", selectedFile);

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${URLPath}/api/v1/fetchExcelDetail/uploadstudentlist`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Student Data Uploaded Successfully!!!");
        }
      } catch (error) {
        toast.error("Error while uploading the data");
      }
    };
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
        <div>
          <div className="flex justify-between w-full items-center">
            <h1 className="text-2xl lg:text-4xl my-5 font-bold">
              Upload Students
            </h1>

            <div>
              <button
                onClick={makeDownload}
                className="flex gap-1 w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Download
                <FaFileDownload className="mt-[2px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col space-y-5">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200"
            onChange={handleSchoolNameChange}
          >
            <option value="" selected disabled>
              Choose School
            </option>

            {schoolNameList &&
              schoolNameList.map(({ school_name, school_id }) => (
                <option value={school_name} key={school_id} className="text-xl">
                  {school_name} {school_id}
                </option>
              ))}
          </select>

          <div>
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="excelFile"
            >
              Upload Excel Sheet
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="excelFile"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              placeholder="Upload Excel Sheet"
            />
          </div>

          <div>
            <button
              onClick={uploadStudentData}
              className="bg-[#ed1450] text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadStudent;
