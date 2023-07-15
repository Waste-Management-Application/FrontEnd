import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [formInfo, setFormInfo] = useState({});
  const form = useRef(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const email = formData.get("email");
    const password = formData.get("password");
    setFormInfo({ email, password });
    navigate("/MainPage");

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
                Login in your account
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
              <NavLink to="/ForgotPassword" className="flex justify-end">
                <h4 className="text-g2 ">Forgot Password?</h4>
              </NavLink>
              <div className="flex border-[2px] shadow-xl  text-white font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center ">
                <input type="submit" name="send" />
              </div>
            </form>

            <div className="m-8 flex w-fill items-center justify-center">
              <div className="border h-[1px] border-g1 w-[30%]"></div>
              <p>or</p>
              <div className="flex items-end border h-[1px] border-g1 w-[30%]"></div>
            </div>
            <div className=" h-auto w-fill m-8  grid grid-cols-2 gap-4">
              <div className="flex h-10 shadow-lg justify-center items-center  bg-white">
                <button>Google</button>
              </div>
              <div className="flex h-10 shadow-lg justify-center items-center bg-white ">
                <button>Apple</button>
              </div>
              <div className="flex h-10 shadow-lg justify-center items-center  bg-white ">
                <button>Twitter</button>
              </div>
              <div className="flex h-10 shadow-lg justify-center items-center  bg-white ">
                <button>Facebook</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
