import { NavLink } from "react-router-dom";
import binImage2 from "./assets/binImage2.png";

function FirstPage() {
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden  h-screen w-full ">
          <div className="flex flex-col h-[60%] bg-g3 w-full overflow-auto opacity-2">
            <h1 className=" text-white font-semibold p-4 ">BinBuddy</h1>
            <div>
              <img src={binImage2} className="" />
            </div>
          </div>
          <NavLink
            to="/SignUp"
            className="flex border text-white  shadow-xl font-semibold h-12 p-4 bg-g3 rounded-3xl m-8 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 "
          >
            <button>Get Started</button>
          </NavLink>
          <NavLink
            to="/SignIn"
            className="flex border-[2px] shadow-xl border-g2 text-g2 font-semibold h-12 p-4 bg-white rounded-3xl m-8 justify-center items-center hover:bg-g3 hover:text-white "
          >
            <button>Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
