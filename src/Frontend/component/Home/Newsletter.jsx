import React, { useState } from "react";
import img from "../../../../src/Frontend/image/Newsletter.png";
import { IP_ADDRESS, PORT } from "../utils/constants";
import { FaCheck, FaSpinner } from "react-icons/fa"; // Import the spinner icon

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [showSuccessIcon, setShowSuccessIcon] = useState(false); // Add state for success icon

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on submit

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

      setErrorMessage(""); // Clear any previous error message

      setTimeout(() => {
        setLoading(false); // Set loading to false
        setShowSuccessIcon(true); // Show success icon after 2 seconds
        setSuccessMessage("Newsletter subscription successful!");
        setTimeout(() => {
          setShowSuccessIcon(false); // Hide success icon after another 2 seconds
          // window.location.reload();
          setSuccessMessage("");
        }, 5000);
      }, 2000);
    } catch (error) {
      console.error("Error submitting newsletter subscription:", error.message);
      setErrorMessage(
        "Failed to submit newsletter subscription. Please try again later."
      );
      // setSuccessMessage(""); // Clear any previous success message
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div
      className="b-0"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}>
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 lg-gap-y-0 gap-y-6 grid-cols-1 lg:px-28 gap-x-10 px-6 p-16 text-white ">
        <div>
          <h1 className="text-3xl">Newsletter</h1>
          <p>Subscribe to our Newsletter</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-x-4 flex items-center justify-end">
          <input
            type="email"
            placeholder="Enter your emailId"
            name="email"
            className="text-black lg:p-2 px-3 rounded-lg w-[70%]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`bg-[#ED1450] px-12 lg:p-2 h-10 w-32 rounded-full flex items-center justify-center transition-transform ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <FaSpinner className="animate-spin" /> // Show spinner during loading
            ) : (
              <span>
                {showSuccessIcon ? (
                  <FaCheck className="text-white" />
                ) : (
                  "Submit"
                )}
              </span>
            )}
          </button>
        </form>
        {successMessage && (
          <div className="justify-center flex relative lg:-right-64   text-yellow-300 ">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="justify-center flex relative lg:-right-64 text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
