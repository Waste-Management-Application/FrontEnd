import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineSend, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
// inset-x-0 bottom-0 absolute

function Bar() {
  return (
    <div className="">
      <div className=" inset-x-0 bottom-0 absolute flex flex-row justify-between p-5 text-g3 border shadow-2xl rounded-t-lg bg-white border-g2  p-auto overflow-auto h-[10%] w-full   ">
        <NavLink to="/MainPage" className="flex flex-col" id="map">
          <AiOutlineHome className="h-12 w-auto " />
          <label htmlFor="map" className="text-g2">
            Home
          </label>
        </NavLink>
        <NavLink to="/News" className="flex flex-col" id="news">
          <FaRegNewspaper className="h-12 w-auto" />
          <label htmlFor="news" className="text-g2">
            News
          </label>
        </NavLink>

        <NavLink to="/Payment" className="flex flex-col w-16" id="Payment">
          <AiOutlineSend className="h-12 w-auto" />
          <label htmlFor="Payment" className="text-g2">
            Payment
          </label>
        </NavLink>
      </div>
    </div>
  );
}

export default Bar;
