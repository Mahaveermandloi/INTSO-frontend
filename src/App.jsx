// import React from "react";
// import AdminRoutes from "./routes/Admin.routes";
// import UserRoutes from "./routes/User.routes";
// import "./App.css";

// const App = () => {
//   return (
//     <>
//       <AdminRoutes />

//       <UserRoutes />
//     </>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/Admin.routes";
import UserRoutes from "./routes/User.routes";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
