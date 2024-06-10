import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Main } from "../Frontend/component/Home/Main";
import AboutUsPage from "../Frontend/component/AboutUs/AboutUsPage";
import Knowledge from "../Frontend/component/Knowledge/Knowledge";
import RegiterForm from "../Frontend/component/Register/RegiterForm";
import MainBlog from "../Frontend/component/Blog/MainBlog";
import BlogPage from "../Frontend/component/Blog/BlogPage";
import GoToTop from "../Frontend/component/common files/GoToTop";
import Layout from "../Frontend/component/common files/Layout";
import ContactUs from "../Frontend/component/Contact/ContactUs";
import StudentRegisterPage from "../Frontend/component/Register/StudentRegisterPage";
import { GalleryPage } from "../Frontend/component/Gallery/GalleryPage";
import MTSOAbout from "../Frontend/component/ExamDetails/MTSOAbout";
import Class1 from "../Frontend/component/ExamDetails/Classes/Class1";
import Class2 from "../Frontend/component/ExamDetails/Classes/Class2";
import Class3 from "../Frontend/component/ExamDetails/Classes/Class3";
import Class4 from "../Frontend/component/ExamDetails/Classes/Class4";
import Class5 from "../Frontend/component/ExamDetails/Classes/Class5";
import Class6 from "../Frontend/component/ExamDetails/Classes/Class6";
import Class7 from "../Frontend/component/ExamDetails/Classes/Class7";
import Class8 from "../Frontend/component/ExamDetails/Classes/Class8";
import Class9 from "../Frontend/component/ExamDetails/Classes/Class9";
import Class10 from "../Frontend/component/ExamDetails/Classes/Class10";

import Login from "../../src/Frontend/component/Login/Login";
import ForgotPassword from "../../src/Frontend/component/Login/ForgotPassword";
import OTPPage from "../../src/Frontend/component/Login/OTPPage";
import Success from "../../src/Frontend/component/Login/Success";
import ChangePassword from "../../src/Frontend/component/Login/ChangePassword";

const UserRoutes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 3000,
    });
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <Layout>
              <AboutUsPage />
            </Layout>
          }
        />
        <Route
          path="/knowledge"
          element={
            <Layout>
              <Knowledge />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegiterForm />
            </Layout>
          }
        />
        <Route
          path="/blogsdetails/:id"
          element={
            <Layout>
              <MainBlog />
            </Layout>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout>
              <BlogPage />
            </Layout>
          }
        />
        <Route
          path="/gallery"
          element={
            <Layout>
              <GalleryPage />
            </Layout>
          }
        />
        <Route
          path="/contactus"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/studentregister"
          element={
            <Layout>
              <StudentRegisterPage />
            </Layout>
          }
        />
        <Route
          path="/mtso_about"
          element={
            <Layout>
              <MTSOAbout />
            </Layout>
          }
        />
        <Route
          path="/class1"
          element={
            <Layout>
              <Class1 />
            </Layout>
          }
        />
        <Route
          path="/class2"
          element={
            <Layout>
              <Class2 />
            </Layout>
          }
        />
        <Route
          path="/class3"
          element={
            <Layout>
              <Class3 />
            </Layout>
          }
        />
        <Route
          path="/class4"
          element={
            <Layout>
              <Class4 />
            </Layout>
          }
        />
        <Route
          path="/class5"
          element={
            <Layout>
              <Class5 />
            </Layout>
          }
        />
        <Route
          path="/class6"
          element={
            <Layout>
              <Class6 />
            </Layout>
          }
        />
        <Route
          path="/class7"
          element={
            <Layout>
              <Class7 />
            </Layout>
          }
        />
        <Route
          path="/class8"
          element={
            <Layout>
              <Class8 />
            </Layout>
          }
        />
        <Route
          path="/class9"
          element={
            <Layout>
              <Class9 />
            </Layout>
          }
        />
        <Route
          path="/class10"
          element={
            <Layout>
              <Class10 />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/otp"
          element={
            <Layout>
              <OTPPage />
            </Layout>
          }
        />
        <Route
          path="/changepassword"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />
        <Route
          path="/success"
          element={
            <Layout>
              <Success />
            </Layout>
          }
        />
      </Routes>

      <GoToTop />
    </div>
  );
};

export default UserRoutes;
