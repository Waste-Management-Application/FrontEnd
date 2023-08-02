import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { adminClient } from "../apiEndpoints/endpoints";

function ForgotPasswordPage() {
  const emailRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      const response = await adminClient.post("/forgotPassword", { email });
      console.log(response.data);
      setSuccessMessage("Password reset token sent to your email.");
      setError(null);
      emailRef.current.value = "";

      // Hide success message and redirect after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setSuccessMessage("");
        // Redirect to the signin page
        // For now, I'll redirect to '/signin'. You can update this as needed.
        window.location.href = "/signin";
      }, 3000);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-1/2 h-full flex flex-col bg-g2">
        <div className="flex justify-center items-center h-full w-full">
          <div className="h-[300px]  bg-white rounded-full mt-10 ">
            <img
              src="./src/assets/splash2.png"
              alt="Splash"
              className="h-[300px]  bg-white rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="bg-g2 w-full h-full object-cover"></div>
      </div>
      <div className="w-1/2 h-full flex flex-col p-20  bg-white justify-between items-center">
        <div></div>
        <h1 className="text-x1 w-full  text-black font-semibold">BinBuddy</h1>
        <div className="w-full flex flex-col max-w-[500px] ">
          <div className="w-full flex flex-col mb-10">
            <h3 className="text-3xl font-semibold mb-4">
              Forgot your password?
            </h3>
            <p className="text-sm mb-2">Please enter your Email</p>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="w-full py-2 my-2 bg-transparent rounded-md text-black border-b border-g3 outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-col">
            <button
              className="w-full bg-g3 rounded-md p-4 my-2 text-center text-white flex items-center justify-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
