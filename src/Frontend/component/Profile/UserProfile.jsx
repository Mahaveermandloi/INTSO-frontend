import React, { useState } from "react";
import useFetchUserProfile from "../utils/hooks/useFetchUserProfile";
import CloseIcon from "@mui/icons-material/Close";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UserProfile = () => {
  const { data, loading } = useFetchUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleIcon = () => {
    setShowPassword(!showPassword);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    const accessToken = localStorage.getItem("token"); // Retrieve access token from local storage

    if (!accessToken) {
      toast.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/user/changePassword`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Unexpected non-JSON response:", textResponse);
        toast.error(
          "Failed to change password. Server returned an unexpected response."
        );
        return;
      }

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully");
        toggleModal();
      } else {
        if (response.status === 401) {
          toast.error("Incorrect old password. Please try again.");
        } else {
          console.error("Error response from server:", responseData);
          toast.error(
            `Failed to change password: ${
              responseData.message || "Unknown error"
            }`
          );
        }
      }
    } catch (error) {
      console.error("Error during password change:", error);
      toast.error("Error: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-screen-xl mx-auto lg:px-20 px-6">
        <div
          id="shadowstyle"
          className="border border-gray-200 p-10 md:m-10 m-3">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-4">
            <div className="flex flex-col justify-center items-center">
              <img
                src="https://as1.ftcdn.net/jpg/03/46/83/96/220_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="Profile"
              />
              <button
                className="bg-[#ED1450] p-2 w-1/2 m-2 text-white"
                onClick={toggleModal}>
                Change Password
              </button>
            </div>
            <div className="flex justify-center items-center">
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Student Name</th>
                    <td className="px-4 py-2">{data.name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">School</th>
                    <td className="px-4 py-2">{data.school_name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Student Class</th>
                    <td className="px-4 py-2">{data.student_class}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Email</th>
                    <td className="px-4 py-2">{data.email}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Address</th>
                    <td className="px-4 py-2">{data.address}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">City</th>
                    <td className="px-4 py-2">{data.city}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Mobile Number</th>
                    <td className="px-4 py-2">{data.mobile_number}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-bold">Board</th>
                    <td className="px-4 py-2">{data.syllabus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="h-screen w-full flex justify-center items-center z-50  overflow-y-auto  fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true">
          <div className="flex flex-col gap-3 p-3 max-w-96 w-full bg-blue-400">
            <p className="flex justify-between items-center px-2">
              <h1>Change Password</h1>X
            </p>
            <p className="flex  justify-between items-center border rounded-md bg-white">
              <input
                type="text"
                placeholder="old password"
                className=" px-2 p-1 w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              )}
            </p>

            <p className="flex  justify-between items-center border rounded-md bg-white">
              <input
                type="text"
                placeholder="old password"
                className=" px-2 p-1 w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              )}
            </p>

            <p className="flex  justify-between items-center border rounded-md bg-white">
              <input
                type="text"
                placeholder="old password"
                className=" px-2 p-1 w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleIcon}
                  className=" cursor-pointer mr-2"
                />
              )}
            </p>

            <p className="flex justify-end gap-2">
              <button className="bg-red-400 p-2 px-4 font-semibold rounded-full">
                Delete
              </button>
              <button className="bg-red-400 p-2 px-4 font-semibold rounded-full">
                Cancel
              </button>
            </p>
          </div>
        </div>
        // <div className="fixed z-50 inset-0 overflow-y-auto">
        //   <div className="flex items-center justify-center min-h-screen">
        //     <div
        //       className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        //       aria-hidden="true"></div>
        //     <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        //       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        //         <div className="sm:flex sm:items-start  w-full">
        //           <div className="mt-3 text-center sm:mt-0 sm:ml-4 ">
        //             <h3 className="flex justify-between text-lg leading-6 font-medium text-gray-900">
        //               Change Password
        //               <CloseIcon onClick={toggleModal} />
        //             </h3>
        //             <div className="mt-2 ">
        //               <form onSubmit={handlePasswordChange} className="w-full flex flex-col justify-center items-center">
        //                 <div className="flex flex-col relative w-full">
        //                   <input
        //                     type={showPassword ? "text" : "password"}
        //                     placeholder="Old Password"
        //                     className="border border-gray-300 p-2 max-w-full mt-2"
        //                     value={oldPassword}
        //                     onChange={(e) => setOldPassword(e.target.value)}
        //                     required
        //                   />
        //                   {showPassword ? (
        //                     <VisibilityIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   ) : (
        //                     <VisibilityOffIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   )}
        //                 </div>
        //                 <input
        //                   type="password"
        //                   placeholder="New Password"
        //                   className="border border-gray-300 p-2 w-full mt-2"
        //                   value={newPassword}
        //                   onChange={(e) => setNewPassword(e.target.value)}
        //                   required
        //                 />
        //                 <div className="flex flex-col relative w-full">
        //                   <input
        //                     type={showPassword ? "text" : "password"}
        //                     placeholder="Old Password"
        //                     className="border border-gray-300 p-2 w-full mt-2"
        //                     value={oldPassword}
        //                     onChange={(e) => setOldPassword(e.target.value)}
        //                     required
        //                   />
        //                   {showPassword ? (
        //                     <VisibilityIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   ) : (
        //                     <VisibilityOffIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   )}
        //                 </div>
        //                 <input
        //                   type="password"
        //                   placeholder="Confirm Password"
        //                   className="border border-gray-300 p-2 w-full mt-2"
        //                   value={confirmPassword}
        //                   onChange={(e) => setConfirmPassword(e.target.value)}
        //                   required
        //                 />

        //                 <div className="flex flex-col relative w-full">
        //                   <input
        //                     type={showPassword ? "text" : "password"}
        //                     placeholder="Old Password"
        //                     className="border border-gray-300 p-2 w-full mt-2"
        //                     value={oldPassword}
        //                     onChange={(e) => setOldPassword(e.target.value)}
        //                     required
        //                   />
        //                   {showPassword ? (
        //                     <VisibilityIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   ) : (
        //                     <VisibilityOffIcon
        //                       onClick={toggleIcon}
        //                       className="absolute right-3 top-5 cursor-pointer"
        //                     />
        //                   )}
        //                 </div>
        //                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-evenly sm:flex-row-reverse w-96">
        //                   <button
        //                     type="submit"
        //                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ED1450] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
        //                     Change
        //                   </button>
        //                   <button
        //                     type="button"
        //                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        //                     onClick={toggleModal}>
        //                     Cancel
        //                   </button>
        //                 </div>
        //               </form>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default UserProfile;
