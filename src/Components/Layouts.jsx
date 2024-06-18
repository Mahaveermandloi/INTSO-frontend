import React from "react";
import AdminFooter from "./AdminFooter"; // Adjust the import path as necessary

const Layouts = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <AdminFooter />
    </div>
  );
};

export default Layouts;
