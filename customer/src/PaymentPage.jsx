import Bar from "./Bar";
import SideBar from "./SideBar";
import { useState } from "react";
import { PaystackButton } from "react-paystack";
// import axios from "axios";

function PaymentPage() {
  const publicKey = "pk_test_903f9806310dd4a90c6af1011df4ae984fbc84e8";
  const amount = 1000000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  //   const config = {
  //     reference: new Date().getTime().toString(),
  //     email: "user@example.com",
  //     amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //     publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
  //   };

  //   const onSuccess = (reference) => {
  //     // Implementation for whatever you want to do with reference and after success call.
  //     console.log(reference);
  //   };

  //   const onClose = () => {
  //     // implementation for  whatever you want to do when the Paystack dialog closed.
  //     console.log("closed");
  //   };

  //   const PaystackHookExample = () => {
  //     const initializePayment = usePaystackPayment(config);
  //     return (
  //       <div>
  //         <button
  //           onClick={() => {
  //             initializePayment(onSuccess, onClose);
  //           }}
  //         >
  //           Paystack Hooks Implementation
  //         </button>
  //       </div>
  //     );
  //   };
  try {
    return (
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className=" h-[600px]">
            <div className="m-4">
              <h1>Please select your network</h1>
            </div>
            <form className="flex flex-col items-center justify-start h-full p-2 my-4 w-fill overflow-auto rounded-md">
              <label>Name</label>
              <input
                className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md "
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md "
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Phone</label>
              <input
                className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md "
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <input
              type="submit"
              className="flex border-[2px] shadow-xl w-[120px] text-white font-semibold h-12  bg-g3 rounded-3xl m-8 justify-center items-center "

              // required
            /> */}
              <PaystackButton
                {...componentProps}
                className="flex border-[2px] shadow-xl w-[120px] text-white font-semibold h-12  bg-g3 rounded-3xl m-8 justify-center items-center "
              />
            </form>
          </div>
          <Bar />
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error:", error);
    // Handle the error or display an error message
  }
}
export default PaymentPage;
