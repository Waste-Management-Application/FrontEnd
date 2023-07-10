import Bar from "./Bar";
import SideBar from "./SideBar";
import "./App.css";

function Feedback() {
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <form className=" h-[600px] ">
            <h1 className="flex font-semibold justify-center m-4">
              Your current input about our operation is welcome and will be
              taken into consideration
            </h1>
            <div className="flex justify-center">
              <input
                type="text"
                className="flex h-[300px] w-full m-4 rounded-lg border shadow-lg "
                placeholder="Type Message"
              />
            </div>
            <div className="flex justify-center">
              <div className="flex border text-white  shadow-xl font-semibold h-12  w-[200px] p-4 bg-g2 rounded-3xl m-8 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 ">
                <button>Submit</button>
              </div>
            </div>
          </form>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
