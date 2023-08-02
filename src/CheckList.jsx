import { useEffect, useState } from "react";
import Bar from "./Bar";
import SideBar from "./SideBar";
import { BsCheck2 } from "react-icons/bs";
import { client } from "../apiEndpoints/endpoints.js";

function CheckList() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint for fetching complaints
      const response = await client.get("/Task/");
      const responseData = response.data.data;
      console.log(responseData);
      const Task = Array.isArray(responseData) ? responseData : [responseData]; // Wrap the data in an array if not already an array
      setTodos(Task);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching Tasks:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const putTodoCompletedStatus = async (id, taskCompleted, driverId) => {
    try {
      await client.post(`/Task/${id}`, { taskCompleted, driverId });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      // Find the task in the todos array with the given id
      const taskToUpdate = todos.find((task) => task._id === id);

      // If the task is already marked as completed, return early
      if (taskToUpdate.taskCompleted === "Completed") {
        return;
      }

      // Update the taskCompleted status to "Completed" in the frontend state
      const updatedTodos = todos.map((task) =>
        task._id === id ? { ...task, taskCompleted: "Completed" } : task
      );
      setTodos(updatedTodos);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found.");
        return;
      }

      // Decode the token to get the adminId
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const driverId = decodedToken.id;

      // Send a PUT request to update the taskCompleted status on the backend
      await putTodoCompletedStatus(id, "Completed", driverId);
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle any error that occurred during the update, if needed
    }
  };

  return (
    <div>
      <div className="flex relative justify-center items-center h-screen w-full ">
        {open && <div className="fixed inset-0  backdrop-blur-md z-50"></div>}

        <div className={`overflow-scroll rounded-3xl  h-screen w-full  `}>
          <div className="flex  h-20 p-4 justify-between text-xl border shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar toggle={toggle} open={open} />
          </div>
          <div className="flex justify-center items-center font-semibold text-lg text-g3">
            <h1>Tick when a task is completed</h1>
          </div>
          <div className="flex h-[70%] w-full ">
            <div className=" my-10 h-[60%] border  w-screen ">
              <ul>
                {todos.map((task) => (
                  <div key={task._id} className="flex h-20 border mx-2 w-fill">
                    <div className="p-2 h-fill w-[70%] border ">
                      <p>{task.taskType}</p>
                    </div>
                    <div
                      className="flex justify-center items-center h-fill w-[30%] "
                      onClick={() => handleCompleteTodo(task._id)}
                    >
                      <div className="flex items-center justify-center border h-10 w-10 rounded-full ">
                        {task.taskCompleted === "Completed" ? (
                          <BsCheck2 className="text-white bg-g2 h-10 w-10 rounded-full" />
                        ) : (
                          <div></div>
                        )}
                      </div>
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
