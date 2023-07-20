import React, { useState } from "react";
import Bar from "./Bar";
import SideBar from "./SideBar";
import client from '../../apiEndpoints/endpoints.js';

function PaymentPage() {
  const [email, setEmail] = useState("");
  const [metadata, setName] = useState("");
  const [amount, setAmount] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const paymentData = {
      amount, 
      email,
      metadata
       
    };

    try {
      // Make the API call to your backend to initiate the payment
      const response = await client.post("payment/initiate", paymentData);

      // Redirect the user to the Paystack payment page
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle any errors here, show an error message to the user, etc.
    }
  };

  
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="overflow-hidden h-screen w-full">
        <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
          <h1 className="font-semibold justify-start text-2xl">BinBuddy</h1>
          <SideBar />
        </div>
        <div className="h-[600px]">
          <div className="m-4">
            <h1>Please fill out the following fields</h1>
          </div>
          <form
            className="flex flex-col items-center justify-start h-full p-2 my-4 w-fill overflow-auto rounded-md"
            onSubmit={handleSubmit}
          >
            <label>Name</label>
            <input
              className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md"
              type="text"
              id="metadata"
              value={metadata}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Amount</label>
            <input
              className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md"
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="submit"
              className="flex border-[2px] shadow-xl w-[120px] text-white font-semibold h-12 bg-g3 rounded-3xl m-8 justify-center items-center"
            >
              Pay Now
            </button>
          </form>
        </div>
        <Bar />
      </div>
    </div>
  );
}

export default PaymentPage;