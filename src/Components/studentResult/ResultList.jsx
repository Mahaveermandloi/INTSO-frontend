import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { URLPath } from "../../URLPath";

const ResultList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultData, setResultData] = useState([]);
  const [examNameList, setExamNameList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleClassChange = (event) => {
    const which_class = event.target.value;
    setSelectedClass(which_class);
  };

  const handleSchoolStatusChange = (event) => {
    const which_status = event.target.value;
    setSelectedStatus(which_status);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Fetch student data
      const studentResponse = await axios.get(
        `${URLPath}/api/v1/result/getAllStudentResults`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("studentResponse", studentResponse.data.data);

      let filteredData = studentResponse.data.data;

      if (selectedClass && selectedStatus) {
        filteredData = filteredData.filter(
          (item) =>
            item.level === selectedClass && item.status === selectedStatus
        );
      } else if (selectedClass) {
        filteredData = filteredData.filter(
          (item) => item.level === selectedClass
        );
      } else if (selectedStatus) {
        filteredData = filteredData.filter(
          (item) => item.status === selectedStatus
        );
      }

      setResultData(filteredData);

      const uniqueExamNames = [
        ...new Set(studentResponse.data.data.map((item) => item.exam)),
      ];
      setExamNameList(uniqueExamNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, selectedStatus]);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);

    const school = resultData.find((school) => school.id === schoolId);
    if (school) {
      setSelectedResult(school);
    } else {
      setSelectedResult(null);
    }
  };

  const totalPages = Math.ceil(resultData.length / itemsPerPage);
  const currentData = resultData.slice(
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
              Students Result
            </h1>
          </div>

          <div className="  lg:flex lg:gap-10 mt-3  lg:space-y-0 space-y-3 lg:mt-5  lg:w-1/2">
            <div className="w-full">
              <form className="w-full mx-auto ">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300  text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2  lg:p-2.5 dark:bg-gray-200 "
                  onChange={handleClassChange}
                >
                  <option selected>Choose a Level</option>
                  <option value="1" className="text-center ">
                    1
                  </option>
                  <option value="2" className="text-center ">
                    2
                  </option>
                </select>
              </form>
            </div>

            <div className="w-full ">
              <form class="w-full mx-auto">
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200  "
                  onChange={handleSchoolStatusChange}
                >
                  <option selected>Choose Status</option>

                  <option value="Pass" className="text-center ">
                    Pass
                  </option>
                  <option value="Fail" className="text-center ">
                    Fail
                  </option>
                </select>
              </form>
            </div>
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
                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800  "
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  SCS number
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  Exam
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  Prize
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  Level
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-md text-white bg-gray-800"
                >
                  Class
                </th>

                <th scope="col" className="px-4 py-2 text-md  bg-gray-200 ">
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
                      {school.student_name}
                    </td>
                    <td className="px-4 py-2 ">{school.scs_number}</td>

                    <td className="px-4 py-2 ">{school.exam}</td>
                    <td className="px-4 py-2">{school.prize}</td>

                    <td className="px-4 py-2 ">{school.status}</td>

                    <td className="px-4 py-2 ">{school.level}</td>
                    <td className="px-4 py-2 ">{school.student_class}</td>

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

        {isModalOpen && selectedResult && (
          <div className="fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-75">
            <div className="mt-16 mx-auto max-w-lg w-full bg-white  p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 ">
                {selectedResult.student_name} Info
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
                    <tr className="">
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Name
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.student_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        SCS Number
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.scs_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Hall Ticket
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.hall_ticket}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Exam
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.exam}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Prize
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.prize}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Prize Details
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.prize_details}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Status
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.status}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Level
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.level}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        Student Dob
                      </td>
                      <td className="text-md lg:text-base px-4 py-2 whitespace-nowrap">
                        {selectedResult.student_dob}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-4">
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

export default ResultList;
