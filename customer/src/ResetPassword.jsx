import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {client} from '../../apiEndpoints/endpoints.js';

function ResetPassword() {
  const { token } = useParams();
  const CpasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPassword = passwordRef.current.value;
    const confirmPassword = CpasswordRef.current.value;

    try {
      const response = await client.patch(`/resetPassword/${token}`, {
        password: newPassword,
        confirmPassword: confirmPassword,
      });

      console.log(response.data);
      setSuccessMessage('Password reset successful! Redirecting to Sign In...');
      setError(null);

      setTimeout(() => {
        window.location.href = '/SignIn';
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("An error occurred during password reset. Please try again.");
      setSuccessMessage('');
    }
  };

  
  return (
    <div>
      <div className="flex  justify-center items-center h-screen  overflow-auto ">
        <div className=" overflow-scroll h-screen w-full">
          <div className="bg-gray-50">
            <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-3xl font-semibold justify-center items-center">
              <h1>BinBuddy</h1>
            </div>
            <div className="flex flex-row bg-white p-4 text-g2 shadow-lg justify-between"></div>
            <div className="flex flex-col scroll-smooth justify-center items-center p-4">
              <h1 className="text-black text-xl font-semibold">
                kindly fill the form
              </h1>
            </div>
            <form
          className="flex flex-col items-center h-auto p-2 m-2 w-fill overflow-auto rounded-md"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            className="h-12 shadow-md w-[90%] my-4 rounded-md"
            placeholder="Password"
            ref={CpasswordRef}
          />
          <input
            type="Password"
            className="h-12 shadow-md w-[90%] my-4 rounded-md"
            placeholder="Confirm Password"
            ref={passwordRef}
          />

          <button
            type="submit"
            className="flex border-[2px] shadow-xl  text-white font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center "
          >
            Submit
          </button>
        </form>
        
        {error && (
              <div className="flex justify-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="flex justify-center text-green-500">
                <p>{successMessage}</p>
              </div>
            )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default ResetPassword;
