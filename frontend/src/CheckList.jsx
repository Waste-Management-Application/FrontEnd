import { useEffect, useState } from "react";
import Bar from "./Bar";
import SideBar from "./SideBar";
import { BsCheck2 } from "react-icons/bs";

function CheckList() {
  const [todos, setTodos] = useState([]);
  const putTodos = async (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
    putTodos(id);
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(
        // `http://localhost:3004/todo?_page=1&_limit=${limit}`
        `https://jsonplaceholder.typicode.com/todos`
      );
      const data = await res.json();

      setTodos(data);
      //setPage(1);
    };

    getTodos();
  }, []);

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
                {todos.map((info, i) => (
                  <div key={i} className="flex h-20 border mx-2 w-fill">
                    <div className="p-2 h-fill w-[70%] border ">
                      <p>{info.title}</p>
                    </div>
                    <div
                      className="flex justify-center items-center h-fill w-[30%] "
                      onClick={() => completeTodo(info.id)}
                    >
                      <div className="flex items-center justify-center border h-10 w-10 rounded-full ">
                        {info.completed ? (
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
