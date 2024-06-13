import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/Admin.routes";
import UserRoutes from "./routes/User.routes";
import "./App.css";
import { baseURL } from "./URLPath";

const App = () => {
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
