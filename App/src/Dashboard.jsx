import { useState } from "react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "homepage", src: "Chart_fill" },
    { title: "customers", src: "User" },
    { title: "drivers", src: "Chart" },
    { title: "requests", src: "Chart" },
    { title: "announcements", src: "Chat" },
    { title: "complaints", src: "Folder" },
    { title: "feedbacks", src: "Setting" },
    { title: "registration", src: "Setting" },

    { title: "Tracking", src: "Chart" },
    { title: "scheduling", src: "Calendar" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } rounded-tr-lg bg-g3 h-full p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-g2 text-g2 border-2 rounded-full  ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/splash2.png"
            className={`h-10 w-10 bg-white rounded-lg cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            BinBuddy
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => {
            return (
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white p-2 rounded-md ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${index === 0 ? "bg-light-white" : ""}`}
              >
                <NavLink to={`/${Menu.title}`} className="flex">
                  <img src={`./src/assets/${Menu.src}.png`} />
                  <div className={`${!open && "hidden m-2"}`}>{Menu.title}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
