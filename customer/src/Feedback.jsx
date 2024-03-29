import React, { useState } from "react";
import Bar from "./Bar";
import SideBar from "./SideBar";
import { client } from "../../apiEndpoints/endpoints";

function Feedback() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      setError("Please enter a message.");
      setSuccessMessage("");
      return;
    }

    setError(null);
    setSuccessMessage("");

    try {
      const response = await client.post("/feedback/", { message });
      console.log(response.data);
      setSuccessMessage("Feedback submitted successfully!");

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      setMessage("");
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
      // Clear the error message after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full">
        {open && <div className="fixed inset-0  backdrop-blur-md z-50"></div>}

        <div className="overflow-hidden h-screen w-full">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1">
            <h1 className="font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar toggle={toggle} open={open} />
          </div>
          <form className="h-[600px]" onSubmit={handleSubmit}>
            <h1 className="flex font-semibold text-xl justify-center m-4">
              Your current input about our operation is welcome and will be
              taken into consideration
            </h1>
            <div className="flex justify-center">
              <textarea
                className="flex h-[200px] w-[90%] m-4 rounded-lg border shadow-lg resize-none"
                placeholder="Type Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex border text-white shadow-xl font-semibold h-10 w-[150px] p-2 bg-g2 rounded-3xl m-4 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3"
              >
                Submit
              </button>
            </div>
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
          </form>
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
