import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight, FaInfoCircle, FaChevronLeft } from "react-icons/fa";
import { URLPath } from "../../URLPath";

const SchoolRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolData, setSchoolData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${URLPath}/api/v1/school/getSchoolData`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const filteredData = response.data.data.getData.filter(
            (school) => school.status === "pending"
          );

          setSchoolData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = (schoolId) => {
    setIsModalOpen(!isModalOpen);
    const school = schoolData.find((school) => school.school_id === schoolId);
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);
    }
  };

  const handleApprove = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${URLPath}/api/v1/school/approveSchool/${selectedSchool.school_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSchoolData((prevData) =>
          prevData.filter(
            (school) => school.school_id !== selectedSchool.school_id
          )
        );

        toast.success("School approved successfully!");

        setTimeout(() => {
          setIsModalOpen(!isModalOpen);
        }, 1000);
      }
    } catch (error) {
      console.error("Error approving school:", error);
      toast.error("Error approving school. Please try again later.");
    }
  };

  const handleReject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${URLPath}/api/v1/school/rejectSchool/${selectedSchool.school_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSchoolData((prevData) =>
          prevData.filter(
            (school) => school.school_id !== selectedSchool.school_id
          )
        );
        toast.success("School rejected successfully!");

        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error rejecting school:", error);
      toast.error("Error rejecting school. Please try again later.");
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-4xl my-2 font-bold">
              School Requests
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 ">
              <tr className="">
                <th
                  scope="col"
                  className="px-4 py-1 text-base bg-gray-800 dark:bg-gray-800"
                >
                  School Name
                </th>
                <th scope="col" className="px-6 py-3 text-base bg-gray-800">
                  Email
                </th>

                <th scope="col" className="px-6 py-3 text-base bg-gray-800">
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-800 text-base dark:bg-gray-800"
                >
                  State
                </th>

                <th scope="col" className="px-6 py-3 text-base bg-gray-800">
                  Mobile Number
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-800 text-base dark:bg-gray-800"
                >
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-base bg-gray-200 ">
                  INFO
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-1  text-center text-gray-500"
                  >
                    No matching records found
                  </td>
                </tr>
              ) : (
                currentData.map(
                  ({
                    school_id,
                    school_name,
                    email,
                    city,
                    state,
                    status,
                    mobile_number,
                  }) => (
                    <tr
                      key={school_id}
                      className="border-b border-gray-200 dark:border-gray-700 text-base"
                    >
                      <td className="px-4 py-1  whitespace-nowrap">
                        {school_name}
                      </td>
                      <td className="px-4 py-1 ">{email}</td>

                      <td className="px-4 py-1 ">{city}</td>
                      <td className="px-4 py-1 ">{state}</td>

                      <td className="px-4 py-1 ">{mobile_number}</td>

                      <td className="px-4 py-1 ">
                        <span
                          className={` ${
                            status === "approved"
                              ? "bg-green-500"
                              : status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-white px-2 py-1 rounded`}
                        >
                          {status || "pending"}
                        </span>
                      </td>

                      <td className="px-4 py-1  text-center">
                        <button onClick={() => toggleModal(school_id)}>
                          <FaInfoCircle size={30} className="text-[#ed1450]" />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-2  fixed-bottom flex justify-center">
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

            {/* Show the last number */}
            {currentPage + 2 < totalPages && (
              <>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-500"
                >
                  ...
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {totalPages}
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="mt-10 mx-auto max-w-lg w-full bg-white  p-5 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">
                {selectedSchool.school_name} Info
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-4 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Email
                      </td>
                      <td className="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.email}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        City
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.city}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        State
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.state}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Mobile Number
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.mobile_number}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Status
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.status}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Landline
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.landline}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        District
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.district}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        STD Code
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.STD_code}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Pincode
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.pincode}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Principal
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.principal_name_prefix} <span> </span>
                        {selectedSchool.principal_name}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-semibold">
                        Syllabus
                      </td>
                      <td class="text-md  lg:text-xl px-4py-1 whitespace-nowrap font-base">
                        {selectedSchool.syllabus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleApprove}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#ed1450] text-white px-4 py-1 rounded hover:bg-red-600"
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

export default SchoolRequests;
