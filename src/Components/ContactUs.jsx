import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLPath } from "../URLPath";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/9214833.jpg";
const ContactUs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await axios.get(
            `${URLPath}/api/v1/contact/getContactDetails`,
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
            // toast.error("Failed to fetch contact details");

          }
        } else {
          toast.error("No token found");
        }
      } catch (error) {
        // toast.error("Error fetching contact details");
      }
    };

    fetchData();
  }, []);

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
      <div>
        <div className="lg:w-10/12 lg:ml-auto">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Contact Us</h1>
          </div>

          {data.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="">
                <tr className="w-full rounded-2xl bg-gray-900 text-gray-200  uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Mobile Number</th>
                  <th className="py-3 px-6 text-left">Message</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.map(({ id, name, email, message, mobile_number }) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={id}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {name}
                    </td>
                    <td className="py-3 px-6 text-left">{email}</td>
                    <td className="py-3 px-6 text-left">{mobile_number}</td>
                    <td className="py-3 px-6 text-left">{message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div>
                <img src={img} className="w-1/2" alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
