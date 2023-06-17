import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex  justify-center items-center h-screen w-fill overflow-auto ">
      <div className="  h-screen w-full overflow-auto ">
        <div className="flex h-24 bg-g3 text-white text-2xl font-semibold justify-center items-center">
          <h1>BinBuddy</h1>
        </div>
        <div className="flex flex-row p-4 text-g2 shadow-lg justify-between">
          <NavLink to="/SignIn">Sign In</NavLink>
          <NavLink to="/SignUp">Get Started</NavLink>
        </div>
        <div className="flex flex-col scroll-smooth justify-center  items-center p-4">
          <h1 className="text-black text-xl font-semibold">
            Become Part of the Future
          </h1>
        </div>
        <div className=" flex flex-col items-center h-auto p-2 m-2 w-fill overflow-auto rounded-md">
          <input
            type="text"
            className="h-10 shadow-md w-[90%] rounded-md "
            placeholder="First Name"
          />
          <input
            type="text"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Last Name"
          />
          <input
            type="email"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Email"
          />
          <input
            type="text"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Phone"
          />
          <input
            type="text"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Digital Address"
          />
          <input
            type="password"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Create Password"
          />
          <input
            type="password"
            className="h-10 shadow-md w-[90%] my-2 rounded-md"
            placeholder="Confirm Password"
          />
          <NavLink
            to="/MainPage"
            className="flex border text-white  shadow-xl font-semibold h-12 p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 "
          >
            <button>Join The Community</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
