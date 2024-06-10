import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Newsletter from "../Home/Newsletter";
import SubHeader from "./SubHeader";
function Layout({ children }) {
  return (
    <>
      <div>
        <Header />
        <SubHeader />
        <main>{children}</main>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
