import { NavLink } from "react-router-dom";

function SignIn() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-1/2 h-full flex flex-col bg-gradient-to-r from-g2 to-g3">
        <div className="flex justify-center items-center h-full w-full">
          <div className="h-[300px] w-[300px] bg-white rounded-lg mt-10 ">
            <img
              src="./src/assets/splash2.png"
              alt="Splash"
              className="h-[300px] w-[300px] bg-white rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <div className="bg-gradient-to-r from-g2 to-g3 w-full h-full object-cover"></div>
      </div>
      <div className="w-1/2 h-full flex flex-col p-20  bg-g1 justify-between items-center">
        <div></div>
        <h1 className="text-x1 w-full  text-black font-semibold">BinBuddy</h1>
        <div className="w-full flex flex-col max-w-[500px] ">
          <div className="w-full flex flex-col mb-10">
            <h3 className="text-3xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">Welcome Please Enter your details</p>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 my-2 bg-transparent rounded-md text-black border-b border-g3 outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 my-2 rounded-md bg-transparent text-black border-b border-g3 outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-col">
            <NavLink
              to="/homepage"
              className="w-full bg-g2 rounded-md p-4 my-2 text-center text-white flex items-center justify-center "
            >
              Log in
            </NavLink>
            <NavLink className="w-full bg-white rounded-md cursor-pointer p-4 my-2 mb-6 text-center text-g2 border-2 border-g3 flex items-center justify-center ">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
