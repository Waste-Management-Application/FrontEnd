import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { adminClient } from '../../apiEndpoints/endpoints.js';

function ResetPasswordPage() {
  const { token } = useParams();
  const CpasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPassword = passwordRef.current.value;
    const confirmPassword = CpasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please make sure both passwords are the same.");
      setSuccessMessage('');
      return;
    }

    try {
      const response = await adminClient.patch(`/resetPassword/${token}`, {
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
    <div className="w-full h-screen flex items-center justify-center">
      {/* Rest of the component code... */}
      <div className="w-full flex flex-col max-w-[500px] ">
        <div className="w-full flex flex-col mb-10">
          <h3 className="text-3xl font-semibold mb-4">Reset Password</h3>
          <p className="text-sm mb-2"> Enter your details</p>
        </div>
        <div className="w-full flex flex-col">
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="w-full py-2 my-2 bg-transparent rounded-md text-black border-b border-g3 outline-none focus:outline-none"
          />
          <input
            type="password"
            ref={CpasswordRef}
            placeholder="Confirm Password"
            className="w-full py-4 my-2 rounded-md bg-transparent text-black border-b border-g3 outline-none focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="w-full flex flex-col">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-g3 rounded-md p-4 my-2 text-center text-white flex items-center justify-center "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
