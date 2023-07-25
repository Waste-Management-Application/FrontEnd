import { NavLink } from "react-router-dom";

function ForgotPasswordPage() {
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
            <h3 className="text-3xl font-semibold mb-4">
              Forgot your password?
            </h3>
            <p className="text-sm mb-2">Please Enter your Email</p>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 my-2 bg-transparent rounded-md text-black border-b border-g3 outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex flex-col">
            <NavLink
              to=""
              className="w-full bg-g3 rounded-md p-4 my-2 text-center text-white flex items-center justify-center "
            >
              Submit
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;