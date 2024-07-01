import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLPath } from "../URLPath";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/9214833.jpg";
import { FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BecomeCoOrdinator = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/co-Ordinator/get-co-ordinator`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            const data = response.data.data.contactUs;
            setData(data);
          } else {
            toast.error("Failed to fetch contact details");
          }
        } else {
          toast.error("No token found");
        }
      } catch (error) {
        toast.error("Error fetching contact details");
      }
    };

    fetchData();
  }, []);

  const handleModal = (contact) => {
    setSelectedContact(contact);
    setToggle(true);
  };

  const closeModal = () => {
    setToggle(false);
    setSelectedContact(null);
  };

  const truncateMessage = (remark, wordLimit) => {
    const words = remark.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return remark;
  };

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
      <div className="p-4 lg:w-10/12 lg:ml-auto">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">
            Become Co-Ordinator
          </h1>
        </div>

        {currentData.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="">
                  <tr className="w-full rounded-2xl bg-gray-900 text-gray-200 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Mobile Number</th>
                    <th className="py-3 px-6 text-left">Remark</th>
                    <th className="py-3 px-6 text-left">Info</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentData.map(
                    ({ id, name, email, remark, mobile_number }) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={id}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap font-semibold text-base">
                          {name}
                        </td>
                        <td className="py-3 px-6 text-left font-semibold text-base">
                          {email}
                        </td>
                        <td className="py-3 px-6 text-left font-semibold text-base">
                          {mobile_number}
                        </td>
                        <td className="py-3 px-6 text-left font-semibold text-base">
                          {truncateMessage(remark, 3)}
                        </td>
                        <td
                          className="py-3 px-6 text-left cursor-pointer"
                          onClick={() =>
                            handleModal({
                              id,
                              name,
                              email,
                              remark,
                              mobile_number,
                            })
                          }
                        >
                          <FaInfoCircle size={20} className="text-green-400" />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-2 flex justify-center">
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

            {toggle && selectedContact && (
              <div className="fixed inset-0 p-2 flex items-center justify-center bg-black bg-opacity-75">
                <div className="mt-16 mx-auto max-w-lg w-full bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-2xl mb-4">{selectedContact.name} Info</h2>
                  <p>
                    <strong>Email:</strong> {selectedContact.email}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong>{" "}
                    {selectedContact.mobile_number}
                  </p>
                  <p>
                    <strong>Remark:</strong> {selectedContact.remark}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={closeModal}
                      className="bg-[#ed1450] text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <img src={img} className="w-1/2 mx-auto" alt="No Data" />
          </div>
        )}
      </div>
    </>
  );
};

export default BecomeCoOrdinator;
