import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLPath } from "../URLPath";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications
import ContactUs from "./ContactUs";

const Dashboard = () => {
  const [stats, setStats] = useState({
    numberOfStudents: 0,
    numberOfSchools: 0,
    schoolRequests: 0,
    freeContentCount: 0,
    paidContentCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/dashboard/dashboardStats`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            const data = response.data.data.stats;

            const formattedStats = {
              schoolRequests: data[0]?.no_of_school_requests || 0,
              numberOfSchools: data[1]?.no_of_approved_school || 0,
              freeContentCount: data[2]?.free_content || 0,
              paidContentCount: data[3]?.paid_content || 0,
              numberOfStudents: data[4]?.no_of_student || 0,
            };

            setStats(formattedStats);
          } else {
          }
        } else {
          toast.error("No token found");
        }
      } catch (error) {}
    };

    fetchStats();
  }, []);

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-2xl lg:text-4xl my-5 font-bold">Dashboard</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-800 dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium text-white  dark:text-gray-400">
                No. of Students
              </p>
              <p className="text-lg font-semibold text-white dark:text-gray-200">
                {stats.numberOfStudents}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-800 dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium text-white dark:text-gray-400">
                No. of Schools
              </p>
              <p className="text-lg font-semibold text-white dark:text-gray-200">
                {stats.numberOfSchools}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-800 dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium text-white dark:text-gray-400">
                School Requests
              </p>
              <p className="text-lg font-semibold text-white dark:text-gray-200">
                {stats.schoolRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-800 dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium text-white dark:text-gray-400">
                Free Content Count
              </p>
              <p className="text-lg font-semibold text-white dark:text-gray-200">
                {stats.freeContentCount}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-800 dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium text-white dark:text-gray-400">
                Paid Content Count
              </p>
              <p className="text-lg font-semibold text-white dark:text-gray-200">
                {stats.paidContentCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
