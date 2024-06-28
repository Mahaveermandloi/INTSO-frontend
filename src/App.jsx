import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/Admin.routes";
import UserRoutes from "./routes/User.routes";
import "./App.css";
import { baseURL } from "./URLPath";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or any async operation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span class="sr-only">Loading...</span>
        <div class="h-6 w-6 bg-[#ED1450] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-6 w-6 bg-[#ED1450] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-6 w-6 bg-[#ED1450] rounded-full animate-bounce"></div>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path={`${baseURL}/*`} element={<AdminRoutes />} />

        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
