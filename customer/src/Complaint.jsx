import React, { useState } from 'react';
import Bar from './Bar';
import SideBar from './SideBar';
import client from '../../apiEndpoints/endpoints';

function Complaint() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      setError('Please enter a message.');
      setSuccessMessage('');
      return;
    }

    setError(null);
    setSuccessMessage('');

    try {
      const response = await client.post('/feedback/complaint', { message });
      console.log(response.data);
      setSuccessMessage('Complaint submitted successfully!');
      setMessage('');
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
      <div className="flex justify-center items-center h-screen w-full">
        <div className="overflow-hidden h-screen w-full">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1">
            <h1 className="font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <form className="h-[600px]" onSubmit={handleSubmit}>
            <h1 className="flex font-semibold justify-center m-4">
            We are sorry for any inconvenience caused. Kindly send us a message in the field below.
            </h1>
            <div className="flex justify-center">
              <textarea
                className="flex h-[300px] w-full m-4 rounded-lg border shadow-lg"
                placeholder="Type Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex border text-white shadow-xl font-semibold h-12 w-[200px] p-4 bg-g2 rounded-3xl m-8 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3"
              >
                Submit
              </button>
            </div>
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
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Complaint;
