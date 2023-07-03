import { FaRegMap } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { NavLink } from "react-router-dom";
// inset-x-0 bottom-0 absolute

function Bar() {
  return (
    <div className="">
      <div className=" inset-x-0 bottom-0 absolute flex flex-row justify-between p-5 text-g3 border shadow-2xl rounded-t-lg bg-white border-g2  p-auto overflow-auto h-[10%] w-full   ">
        <NavLink to="/MainPage" className="flex flex-col">
          <FaRegMap className="h-12 w-auto " id="map" />
          <label htmlFor="map" className="text-g2">
            Map
          </label>
        </NavLink>
        <NavLink to="/News" className="flex flex-col">
          <FaRegNewspaper className="h-12 w-auto" />
          <label htmlFor="map" className="text-g2">
            News
          </label>
        </NavLink>

        <NavLink to="/CheckList">
          <BsCardChecklist id="checklist" className="h-12 w-auto " />
          <label htmlFor="checklist" className="text-g2">
            Checklist
          </label>
        </NavLink>
      </div>
    </div>
  );
}

export default Bar;
