import React from "react";
import Header from "./Header";
import { News } from "./Latest&News";

function Layout2({ children }) {
  return (
    <div>
      <News />
      <main>{children}</main>
    </div>
  );
}

export default Layout2;
