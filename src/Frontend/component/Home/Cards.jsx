import React from "react";

import img1 from "../../../../src/assets/Frontend_images/Special Education.png";
import img2 from "../../../../src/assets/Frontend_images/Book.png";
import img3 from "../../../../src/assets/Frontend_images/Certification.png";
import img4 from "../../../../src/assets/Frontend_images/Special EducationIcon.png";
import img5 from "../../../../src/assets/Frontend_images/BookIcon.png";
import img6 from "../../../../src/assets/Frontend_images/CertificationIcon.png";


export const Cards = () => {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto grid sm:grid-cols-3 grid-cols-1 lg:px-28 px-6 py-16 text-white">
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center sm:p-10 p-10 space-y-3"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <img src={`${img4}`} className="" />
          <h1 className="text-xl font-bold text-center">
            Intellectual Stimulation
          </h1>
          <p className="text-center">
            INTSO is a platform for students to challenge themselves
            intellectually beyond the standard curriculum. These exams often
            feature complex problems that require critical thinking,
            problem-solving skills, and creativity to solve, thus fostering
            cognitive development.
          </p>
        </div>
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center p-10 space-y-3"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <img src={`${img5}`} />
          <h1 className="text-xl font-bold text-center">
            Recognition and Validation
          </h1>
          <p className="text-center">
            Achieving success in Olympiad exams can provide recognition and
            validation to your child’s academic abilities. Winning or performing
            well in these competitions can boost confidence, motivate your child
            to excel further, and may even open doors to scholarships,
            prestigious academic programs, or opportunities for advanced study.
          </p>
        </div>
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center p-10 space-y-3"
          style={{
            backgroundImage: `url(${img3})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <img src={`${img6}`} />
          <h1 className="text-xl font-bold text-center">
            Preparation for Higher Education and Careers
          </h1>
          <p className="text-center">
            Participating in Olympiad exams helps your child to develop skills
            that are highly valued in higher education and professional fields,
            such as mathematics, science, computer science, and more. The
            rigorous preparation for these exams equips them with a solid
            foundation in these subjects, which can be beneficial for pursuing
            advanced studies or careers in STEM fields.
          </p>
        </div>
      </div>
    </div>
  );
};
