import React from "react";
import img from "../../../../src/assets/Frontend_images/Our Mision.png";
export const OurMission = () => {
  return (
    <>
      <div data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto lg:px-28 px-6 mt-16">
          <div className=" flex flex-col py-7 justify-center items-center">
            <h1 className="text-[#ED1450] font-bold text-2xl ">Our Mission</h1>
            <p className="w-16 border-b-2 border-[#ED1450]"></p>
          </div>
          <h1 className="text-2xl font-bold text-center">
            Empowering Learners Through Quality Eduction And Assessment
          </h1>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 items-center justify-center">
            <div className=" text-black sm:text-justify space-y-3 text-center">
              <p>
                At INTSO Olympiad, we're passionate about nurturing talent and
                fostering academic excellence through Olympiad exams. As a
                dedicated organization, we provide a platform for students to
                showcase their skills and knowledge in subjects like
                Mathematics, Science, English, and more. Our goal is to inspire
                young minds, encourage critical thinking, and promote healthy
                competition. With a commitment to fairness and integrity, we
                offer students the opportunity to challenge themselves, excel
                academically, and reach their full potential. Join us as we
                embark on a journey of learning, growth, and achievement!
              </p>
            </div>
            <div className="flex justify-end">
              <img src={img} className="w-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
