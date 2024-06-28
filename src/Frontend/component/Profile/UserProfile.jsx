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
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const toggleIcon1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleIcon2 = () => {
    setShowPassword2(!showPassword2);
  };
  const toggleIcon3 = () => {
    setShowPassword3(!showPassword3);
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

        // Clear input fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

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
          <div className="flex flex-col gap-3 p-3 max-w-96 w-full bg-white rounded-lg">
            <p className="flex justify-between items-center px-2">
              <h1>Change Password</h1>
              <CloseIcon onClick={toggleModal} />
            </p>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div className="flex  justify-between items-center border rounded-md bg-white">
                <input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="old password"
                  className=" px-2 p-1 w-full"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                {showPassword1 ? (
                  <VisibilityIcon
                    onClick={toggleIcon1}
                    className=" cursor-pointer mr-2"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={toggleIcon1}
                    className=" cursor-pointer mr-2"
                  />
                )}
              </div>

              <div className="flex  justify-between items-center border rounded-md bg-white">
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="New password"
                  className=" px-2 p-1 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {showPassword2 ? (
                  <VisibilityIcon
                    onClick={toggleIcon2}
                    className=" cursor-pointer mr-2"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={toggleIcon2}
                    className=" cursor-pointer mr-2"
                  />
                )}
              </div>

              <div className="flex  justify-between items-center border rounded-md bg-white">
                <input
                  type={showPassword3 ? "text" : "password"}
                  placeholder="confirm password"
                  className=" px-2 p-1 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {showPassword3 ? (
                  <VisibilityIcon
                    onClick={toggleIcon3}
                    className=" cursor-pointer mr-2"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={toggleIcon3}
                    className=" cursor-pointer mr-2"
                  />
                )}
              </div>

              <p className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-[#ED1450] text-white p-2 px-4 font-semibold rounded-full">
                  change
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-white  border border-gray-300 p-2 px-4 font-semibold rounded-full">
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
