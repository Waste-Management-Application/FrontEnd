import Bar from "./Bar";
import SideBar from "./SideBar";

function CheckList() {
  const task = [
    {
      title: "News1",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News2",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News3",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News4",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News5",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
  ];
  return (
    <div>
      <div className="flex relative justify-center items-center h-screen w-full ">
        <div className={`overflow-scroll rounded-3xl  h-screen w-full  `}>
          <div className="flex  h-20 p-4 justify-between text-xl border shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className="flex justify-center items-center font-semibold text-lg text-g3">
            <h1>Tick when a task is completed</h1>
          </div>
          <div className="flex h-[70%] w-full ">
            <div className=" my-10 h-[60%] border  w-screen ">
              <ul>
                {task.map((info, i) => (
                  <div
                    key={i}
                    className="flex h-20 border  w-fill m-4 shadow-md"
                  >
                    <div className="h-fill w-[70%] border ">
                      <p>Task {i}</p>
                    </div>
                    <div className="flex justify-center items-center h-fill w-[30%] ">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-g2"
                        />
                        <span className="ml-2 text-gray-700">Check me</span>
                      </label>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <Bar />
        </div>
      </div>
    </div>
  );
}

export default CheckList;
