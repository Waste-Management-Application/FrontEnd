import map from "./assets/map.webp";
//import { FaLocationArrow } from "react-icons/fa";
import Bar from "./Bar";
import SideBar from "./SideBar";

function MainPage() {
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex  h-20 p-4 justify-between text-xl shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className="flex h-[520px] border justify-end items-baseline">
            <img src={map} className="h-full z-90" />
            {/* <div className="flex z-0 text-g4 border justify-center items-center rounded-full border-bg2 h-8 w-8">
              <FaLocationArrow />
            </div> */}
          </div>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
