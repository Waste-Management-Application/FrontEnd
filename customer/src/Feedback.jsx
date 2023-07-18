import { useState } from 'react';
import Bar from "./Bar";
import SideBar from "./SideBar";
import "./App.css";
import client from "../../apiEndpoints/endpoints.js";

function Feedback() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('message', message);

    client
      .post('/feedback', formData)
      .then((response) => {
        console.log(response.data);
        // Handle successful feedback submission
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError({ message: 'An error occurred. Please try again later.' });
        }
      });
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
            Your current input about our operation is welcome and will be
            taken into consideration
            </h1>
            <div className="flex justify-center">
              <input
                type="text"
                className="flex h-[300px] w-full m-4 rounded-lg border shadow-lg"
                placeholder="Type Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <div className="flex border text-white shadow-xl font-semibold h-12 w-[200px] p-4 bg-g2 rounded-3xl m-8 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
          {/* Error message */}
          {error && (
            <div className="flex justify-center text-red-500">
              <p>{error.message}</p>
            </div>
          )}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
