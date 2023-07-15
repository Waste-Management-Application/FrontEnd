import { useRef } from "react";
import { NavLink } from "react-router-dom";

function ResetPassword() {
  const CpasswordRef = useRef(null);
  const passwordRef = useRef(null);
  return (
    <div>
      <div className="flex  justify-center items-center h-screen  overflow-auto ">
        <div className=" overflow-scroll h-screen w-full">
          <div className="bg-gray-50">
            <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-3xl font-semibold justify-center items-center">
              <h1>BinBuddy</h1>
            </div>
            <div className="flex flex-row bg-white p-4 text-g2 shadow-lg justify-between"></div>
            <div className="flex flex-col scroll-smooth justify-center items-center p-4">
              <h1 className="text-black text-xl font-semibold">
                kindly fill the form
              </h1>
            </div>
            <form className="flex flex-col items-center h-auto p-2 m-2 w-fill overflow-auto rounded-md">
              <input
                type="password"
                className="h-12 shadow-md w-[90%] my-4 rounded-md"
                placeholder="Password"
                ref={CpasswordRef}
              />
              <input
                type="Password"
                className="h-12 shadow-md w-[90%] my-4 rounded-md"
                placeholder="Confirm Password"
                ref={passwordRef}
              />
            </form>
            <NavLink
              to="/MainPage"
              className="flex border-[2px] shadow-xl  text-white font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center "
            >
              <button>Submit</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
