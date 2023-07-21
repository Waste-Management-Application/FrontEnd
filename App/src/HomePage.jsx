import Dashboard from "./Dashboard";
import { GrUserWorker } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    //full container for page content
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      {/* container for right side */}
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Welcome Admin</h1>
        </div>

        <div className=" h-[90%] grid grid-cols-3 grid-rows-2 w-full gap-4">
          {/* container for the map */}

          <div className=" m-4 rounded-md border shadow-lg col-span-1 row-span-1">
            <div className="w-full  border-b-2 h-[15%]">
              <h1 className="m-2">Real time Tracking</h1>
            </div>
            <div>
              <img src="./src/assets/Simple-Location-Picker.webp" />
            </div>
          </div>
          <div className="col-span-2  m-4 grid grid-cols-3 gap-4">
            <NavLink to="/drivers" className="border shadow-lg">
              <GrUserWorker className="h-8 w-8" />
              <h1>drivers</h1>
              <h1 className="font-bold text-g2 text-5xl">12</h1>
            </NavLink>
            <NavLink to="/requests" className="border shadow-lg">
              <GrUserWorker className="h-8 w-8" />
              <h1>Requests</h1>
              <h1 className="font-bold text-g2 text-5xl">23</h1>
            </NavLink>
            <NavLink to="/customers" className="border shadow-lg">
              <CiUser className="h-8 w-8 text-2xl" />
              <h1>Customers</h1>
              <h1 className="font-bold text-g2 text-5xl">15</h1>
            </NavLink>
            <div className="grid grid-cols-2 col-span-3 gap-4 ">
              <NavLink className="border col-span- shadow-lg">
                <CiUser className="h-8 w-8" />
                <h1>Feedbacks</h1>
                <h1 className="font-bold text-g2 text-5xl">15</h1>
              </NavLink>
              <div className="border col-span-1   shadow-lg">
                <GrUserWorker className="h-8 w-8" />
                <h1>Complaints</h1>
                <h1 className="font-bold text-g2 text-5xl">15</h1>
              </div>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <div className="border col-span-1   shadow-lg">
              <div className="w-full  border-b-2 h-[10%]">
                <h1 className="m-2">Scheduling</h1>
              </div>
            </div>
            <div className="border col-span-1   shadow-lg">
              <div className="w-full  border-b-2 h-[10%]">
                <h1 className="m-2">Announcements</h1>
              </div>
              {/* <div className="flex h-fit w-full justify-center items-center">
                <img
                  className=" w-full "
                  src="./src/assets/71-714997_message-icon-grey-message-icon-png-grey-transparent.png"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
