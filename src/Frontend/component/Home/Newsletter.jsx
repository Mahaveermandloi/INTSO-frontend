import React, { useState } from "react";
import img from "../../../../src/Frontend/image/Newsletter.png";
import { IP_ADDRESS, PORT } from "../utils/constants";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/v1/newsLetter/postnewsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit newsletter subscription.");
      }

      // Reset email input after successful submission
      setEmail("");
      alert("Newsletter subscription successful!");
    } catch (error) {
      console.error("Error submitting newsletter subscription:", error.message);
      alert(
        "Failed to submit newsletter subscription. Please try again later."
      );
    }
  };

  return (
    <div
      className="b-0"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}>
      <div className=" max-w-screen-xl mx-auto grid lg:grid-cols-2 lg-gap-y-0 gap-y-6 grid-cols-1 lg:px-28 gap-x-10 px-6 p-16 text-white">
        <div className="">
          <h1 className="text-3xl">Newsletter</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-x-4 flex justify-end">
          <input
            type="email"
            placeholder="Enter your emailId"
            name="email"
            className="bg-white lg:p-2 p-3 px-3 rounded-lg w-[70%]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#ED1450] px-12 lg:p-2 p-3 w-40 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
