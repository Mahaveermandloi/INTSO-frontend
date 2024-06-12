import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URLPath } from "../URLPath";

const NewsLetter = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${URLPath}/api/v1/newsLetter/getAllNewsletter`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data.data.newsLetterData);
      console.log(response.data.data.newsLetterData);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run once on component mount

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
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
          <div className="flex justify-between w-full items-center">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold">Newsletter</h1>
            </div>
            <div>
              <button className="flex gap-1 w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Download
                <FaFileDownload className="mt-[2px]" />
              </button>
            </div>
          </div>
        </div>

        <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                Email
              </th>
              <th scope="col" className="px-4 py-2 text-md bg-gray-800">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No matching records found
                </td>
              </tr>
            ) : (
              currentData.map(({ email, id, createdAt }) => (
                <tr
                  key={id}
                  className="bg-white border-b dark:bg-gray-100 dark:border-gray-300"
                >
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">{formatDate(createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="mt-5 fixed-bottom flex justify-center">
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

            {[...Array(totalPages).keys()].map((number) => (
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
      </div>
    </>
  );
};

export default NewsLetter;
