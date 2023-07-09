import Bar from "./Bar";
import SideBar from "./SideBar";
import "./App.css";

function MainPage() {
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className=" h-[600px] z-10">
            <div></div>
          </div>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
