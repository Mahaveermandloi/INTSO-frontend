import React from "react";

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-center bottom-0 text-white p-2 lg:w-10/12 lg:ml-auto">
      <span className="text-sm text-gray-400 dark:text-gray-400 p-3">
        Copyright {currentYear} | Design & Developed By: Ozonesoft Solutions
      </span>
    </footer>
  );
};

export default AdminFooter;
