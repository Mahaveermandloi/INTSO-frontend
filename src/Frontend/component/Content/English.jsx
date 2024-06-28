import React from "react";
import useFetchQandA from "../utils/hooks/useFetchQandA";
const English = () => {
  const { data3: EnglishGrammar, loading } = useFetchQandA();
  console.log(EnglishGrammar);
  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-16 px-6">
        <div className="space-y-6">
          {EnglishGrammar.map((item, index) => (
            <div
              key={index}
              className="space-y-2 border border-gray-200 rounded p-3">
              <h1 className="font-bold text-lg">
                <span>Q.{index + 1} </span> {item.question}
              </h1>
              <p>
                <span className="font-bold">Ans </span> {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default English;
