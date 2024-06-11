import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1>UserDashboard</h1>
        <button
          className="bg-[#ED1450] rounded-full px-6 text-white"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
