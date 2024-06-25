import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import UserDashboard from "../../src/Frontend/component/User/UserDashboard";
import UserKnowledgeDesk from "../Frontend/component/User/UserKnowledgeDesk";
import FreeResources from "../Frontend/component/Knowledge/Free Resources/FreeResources";

import PaidImages from "../Frontend/component/Knowledge/Paid Resources/PaidImages";
import PaidVideos from "../Frontend/component/Knowledge/Paid Resources/PaidVideos";
import PaidPdfs from "../Frontend/component/Knowledge/Paid Resources/PaidPdfs";

import Images from "../Frontend/component/Knowledge/MoreData/Images";
import Videos from "../Frontend/component/Knowledge/MoreData/Videos";
import Pdfs from "../Frontend/component/Knowledge/MoreData/Pdfs";
import PaidResources from "../Frontend/component/Knowledge/PaidResources";
import PaidKnowledge from "../Frontend/component/Knowledge/Paid Resources/PaidKnowledge";
import TestimonialPage from "../Frontend/component/Testimonials/TestimonialPage";
import { RewardImages } from "../Frontend/component/Gallery/RewardImages";
import CareerWithUs from "../Frontend/component/Career/CareerWithUs";
import FAQ from "../Frontend/component/FAQ/FAQ";

const UserRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
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
              {/* <Knowledge /> */}
              <FreeResources />
            </Layout>
          }
        />

        {/* MAHAVEER MODIFIED */}
        <Route
          path="/images"
          element={
            <Layout>
              {/* <Knowledge /> */}
              <Images />
            </Layout>
          }
        />
        <Route
          path="/videos"
          element={
            <Layout>
              <Videos />
            </Layout>
          }
        />
        <Route
          path="/pdfs"
          element={
            <Layout>
              <Pdfs />
            </Layout>
          }
        />

        {/*  */}
        <Route
          path="/register"
          element={
            <Layout>
              <RegiterForm />
            </Layout>
          }
        />
        <Route
          path="/blogsdetails/:permalink"
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
          path="/testimonials"
          element={
            <Layout>
              <TestimonialPage />
            </Layout>
          }
        />
        <Route
          path="/rewards"
          element={
            <Layout>
              <RewardImages />
            </Layout>
          }
        />
        <Route
          path="/career"
          element={
            <Layout>
              <CareerWithUs />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />

        {!isAuthenticated && (
          <>
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
          </>
        )}

        {isAuthenticated && (
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <Main />
                </Layout>
              }
            />

            <Route
              path="/paidimage"
              element={
                <Layout>
                  <PaidImages />
                </Layout>
              }
            />
            <Route
              path="/paidvideos"
              element={
                <Layout>
                  <PaidVideos />
                </Layout>
              }
            />
            <Route
              path="/paidpdfs"
              element={
                <Layout>
                  <PaidPdfs />
                </Layout>
              }
            />

            <Route
              path="/mycontent"
              element={
                <Layout>
                  <PaidKnowledge />
                </Layout>
              }
            />

            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/forgotpassword" element={<Navigate to="/" />} />
            <Route path="/otp" element={<Navigate to="/" />} />
            <Route path="/changepassword" element={<Navigate to="/" />} />
            <Route path="/success" element={<Navigate to="/" />} />
          </>
        )}

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>

      <GoToTop />
    </div>
  );
};

export default UserRoutes;
