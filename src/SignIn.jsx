import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { adminClient } from "../apiEndpoints/endpoints";

function SignIn() {
  const [error, setError] = useState("");
  const form = useRef(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const jsonData = Object.fromEntries(formData);
    const email = formData.get("email");
    const password = formData.get("password");

    adminClient
      .post("/adminSignIn/", jsonData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log(response.data);
        navigate("/HomePage");
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
            <h3 className="text-3xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">Welcome, please enter your details</p>
          </div>
          <div className="w-full flex flex-col">
            <form ref={form} onSubmit={handle}>
              <input
                type="email"
                placeholder="Email"
                className="w-full py-2 my-2 bg-transparent rounded-md text-black border-b border-g3 outline-none focus:outline-none"
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 my-2 rounded-md bg-transparent text-black border-b border-g3 outline-none focus:outline-none"
                name="password"
              />
              <button
                type="submit"
                className="w-full bg-g2 rounded-md p-4 my-2 text-center text-white flex items-center justify-center"
              >
                Log in
              </button>
            </form>
            {/* <NavLink
              to="/homepage"
              className="w-full bg-g3 rounded-md p-4 my-2 text-center text-white flex items-center justify-center "
            >
              Log in
            </NavLink> */}
            <NavLink
              to="/signup"
              className="w-full bg-white rounded-md cursor-pointer p-4 my-2 mb-6 text-center text-g2 border-2 border-g3 flex items-center justify-center "
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/forgotpassword"
              className="flex justify-center items-center"
            >
              <h1 className="text-g2">forgot password?</h1>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
