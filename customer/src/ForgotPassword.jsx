import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import {client} from '../../apiEndpoints/endpoints.js';

function ForgotPassword() {
  const emailRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      const response = await client.post('/forgotPassword', { email });
      console.log(response.data);
      setSuccessMessage('Password reset token sent to your email.');
      setError(null);
      emailRef.current.value = '';

      // Hide success message and redirect after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setSuccessMessage('');
        // Redirect to the signin page
        window.location.href = '/signin';
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div>
      <div className="flex justify-center items-center h-screen overflow-auto">
        <div className="overflow-scroll h-screen w-full">
          <div className="bg-gray-50">
            <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-3xl font-semibold justify-center items-center">
              <h1>BinBuddy</h1>
            </div>
            <div className="flex flex-row p-4 text-g2 shadow-lg justify-between"></div>
            <div className="flex flex-col scroll-smooth justify-center items-center p-4">
              <h1 className="text-black text-xl font-semibold">Provide Your Email</h1>
            </div>
            <form
              className="flex flex-col items-center h-auto p-2 m-2 w-fill overflow-auto rounded-md"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                className="h-12 shadow-md w-[90%] my-4 rounded-md"
                placeholder="E-mail"
                ref={emailRef}
              />
              <button
                type="submit"
                className="flex border-[2px] shadow-xl text-white font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center"
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

export default ForgotPassword;
