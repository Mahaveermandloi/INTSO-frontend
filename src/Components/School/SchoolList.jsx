import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { URLPath } from "../../URLPath";

const SchoolList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolData, setSchoolData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSchoolName, setSelectedSchoolName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const schoolResponse = await axios.get(
        `${URLPath}/api/v1/school/getSchoolData`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const approvedSchools = schoolResponse.data.data.getData.filter(
        (school) => school.status === "approved"
      );

      setSchoolData(approvedSchools);
      console.log(approvedSchools);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedSchoolName]);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);

    const school = schoolData.find((school) => school.id === schoolId);
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);
    }
  };

  const deleteSchool = async (school_id) => {
    setIsModalOpen(!isModalOpen);
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `${URLPath}/api/v1/school/deleteSchoolRequest/${school_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the state to remove the deleted school
        setSchoolData((prevData) =>
          prevData.filter((school) => school.school_id !== school_id)
        );
        toast.success("School deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting school:", error);
      toast.error("Error deleting school. Please try again later.");
    }
  };

  const totalPages = Math.ceil(schoolData.length / itemsPerPage);
  const currentData = schoolData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="lg:w-10/12 lg:ml-auto">
        <div className=" lg:flex justify-between  items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl  lg:my-5 font-bold">
              School List
            </h1>
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
              <tr className="">
                <th scope="col" className="px-4 py-2 text-md bg-gray-800  ">
                  School Name
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Mobile Number
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  Email
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                  City
                </th>

                <th scope="col" className="px-4 py-2 text-md bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No matching records found
                  </td>
                </tr>
              ) : (
                currentData.map((school) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-100 dark:border-gray-300"
                    key={school.id}
                  >
                    <td className="px-4 py-2 text-base font-bold text-black">
                      {school.school_name}
                    </td>

                    <td className="px-4 py-2 ">{school.mobile_number}</td>

                    <td className="px-4 py-2 ">{school.email}</td>

                    <td className="px-4 py-2 ">{school.city}</td>

                    <td className="px-4 py-2  ">
                      <button onClick={() => toggleModal(school.id)}>
                        <FaInfoCircle size={20} className="text-green-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-2 fixed-bottom flex justify-center">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronLeft />
            </button>

            {/* Page numbers */}
            {[...Array(Math.min(totalPages, 3)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {number + 1}
              </button>
            ))}

            {/* Show number 4 after 3 pages */}
            {currentPage >= 4 && (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-500"
                >
                  ...
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`mx-1 px-3 py-1 rounded bg-blue-500 text-white`}
                >
                  {currentPage}
                </button>
              </>
            )}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {isModalOpen && selectedSchool && (
          <div className="fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-75">
            <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 ">
                {selectedSchool.school_name} Info
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Email
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Address
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        City
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.city}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        State
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.state}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Pincode
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.pincode}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Mobile Number
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.mobile_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        School Name
                      </td>
                      <td className="text-md font-bold lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.school_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Status
                      </td>
                      <td className="text-md font-bold  text-green-500 lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.status}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Syllabus
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedSchool.syllabus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-evenly mt-4">
                <button
                  onClick={() => deleteSchool(selectedSchool.school_id)}
                  className=" text-white px-4 py-2 rounded bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#ed1450] text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SchoolList;
