import { NavLink } from "react-router-dom";
import { useRef } from "react";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const CpasswordRef = useRef(null);
  const FnameRef = useRef(null);
  const LnameRef = useRef(null);
  const digitalRef = useRef(null);
  const phoneRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phoneRef);
  };
  return (
    <div className="flex  justify-center items-center h-screen w-fill overflow-auto shadow- ">
      <div className="  h-screen w-full overflow-auto ">
        <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-2xl font-semibold justify-center items-center">
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
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center h-[80%] p-2 m-2 w-fill overflow-auto rounded-md"
        >
          <div className=" h-[8%] w-fill  grid grid-cols-2 gap-4">
            <input
              type="text"
              className="h-9 shadow-md w-[90%] rounded-md text-center"
              placeholder="First Name"
              ref={FnameRef}
              // required
            />
            <input
              type="text"
              className="h-9 shadow-md w-[95%]  rounded-md text-center"
              placeholder="Last Name"
              ref={LnameRef}
              // required
            />
          </div>

          <input
            type="email"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Email"
            ref={emailRef}
            // required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Contact"
            ref={phoneRef}
            // required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Digital Address"
            ref={digitalRef}
            // required
          />
          <input
            type="password"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Create Password"
            ref={passwordRef}
            // required
          />
          <input
            type="password"
            className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md "
            placeholder="Confirm Password"
            ref={CpasswordRef}
            // required
          />

          <select
            name="Gender"
            id="cars "
            className="border h-[8%] shadow-md text-center w-[90%] my-2 rounded-md  "
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <NavLink
            to="/MainPage"
            className="flex border text-white my-12 shadow-xl font-semibold h-12 p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 "
          >
            <button>Join The Community</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
