import React from "react";
import img from "../../../../src/assets/Frontend_images/exam.png";

export const AboutExam = () => {
  return (
    <>
      <div className="bg-slate-100 sm:p-6 p-5 space-y-5">
        <div className="max-w-screen-xl mx-auto lg:p-24 p-6">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-3 items-center justify-center">
            <div className=" text-black text-justify space-y-3">
              <h1 className="text-2xl font-bold">WHAT IS OLYMPIAD EXAMS?</h1>
              <p>
                Olympiad exams are academic competitions designed to challenge
                students in various subjects beyond the standard curriculum.
                These exams typically cover subjects like Mathematics, Science,
                English, and more. They aim to foster critical thinking,
                problem-solving skills, and creativity among participants.
                Olympiads often feature challenging questions that require deep
                understanding and application of concepts. Students compete at
                various levels, starting from school, regional, national, and
                sometimes international levels, showcasing their knowledge and
                skills. Winning or performing well in Olympiad exams can bring
                recognition, validation, and opportunities for further academic
                and professional growth.”
              </p>
            </div>
            <div className="flex justify-end">
              <img src={img} className="w-70 h-72 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
