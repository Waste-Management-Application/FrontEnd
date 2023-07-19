import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import client from "../../apiEndpoints/endpoints.js";

function SignIn() {
  const [formInfo, setFormInfo] = useState({});
  const form = useRef(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const jsonData = Object.fromEntries(formData)
    const email = formData.get("email");
    const password = formData.get("password");
    setFormInfo({ email, password });

    const token = localStorage.getItem("token"); // Retrieve the token from storage

    client
            .post("/driverSignIn/", jsonData)
            .then((response) => {
              const token = response.data.token;
              localStorage.setItem("token", token); 
              console.log(response.data);
              navigate("/MainPage");
            })
            .catch((error) => {
              console.error(error);
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                setError(error.response.data.error);
              } else {
                setError("An error occurred. Please try again later.");
              }
            });
    return false; // Prevent default form submission behavior
  };

  return (
    <div>
      <div className="flex  justify-center items-center h-screen  overflow-auto ">
        <div className=" overflow-scroll h-screen w-full">
          <div className="bg-gray-50">
            <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-3xl font-semibold justify-center items-center">
              <h1>BinBuddy</h1>
            </div>
            <div className="flex flex-row bg-white p-4 text-g2 shadow-lg justify-between">
              <NavLink to="/SignIn">Sign In</NavLink>
              <NavLink to="/SignUp">Get Started</NavLink>
            </div>
            <div className="flex flex-col scroll-smooth justify-center items-center p-4">
              <h1 className="text-black text-xl font-semibold">
                Login Now
              </h1>
            </div>
            <form
              ref={form}
              onSubmit={handle}
              className="flex flex-col items-center h-auto p-2 m-2 w-fill overflow-auto rounded-md"
            >
              <input
                type="email"
                name="email"
                className="h-12 shadow-md w-[90%] my-4 rounded-md text-center"
                placeholder="E-mail"
              />
              <input
                type="Password"
                name="password"
                className="h-12 shadow-md w-[90%] my-4 rounded-md text-center"
                placeholder="Password"
              />
  
              <div className="flex border-[2px] shadow-xl  text-white font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center ">
                <input type="submit" name="send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
