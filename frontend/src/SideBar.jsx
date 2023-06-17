import { BiMenu } from "react-icons/bi";
import { useState } from "react";

function SideBar() {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="h-screen flex items-start justify-end z-10 ">
        <BiMenu className={` h-10 w-auto   duration-300`} onClick={toggle} />
        <div
          className={`${
            open ? "w-48" : "w-0"
          }  bg-g2 h-screen relative duration-500 opacity-80`}
        >
          {/* <h1
            className={`text-white font-semibold text-center duration-300 ${
              !open && `invisible`
            }`}
          >
            BinBuddy
          </h1> */}
          <div
            className={`flex flex-col justify-center items-center ${
              !open && `invisible`
            }
            `}
          >
            <div className="border rounded-full bg-white h-20 w-20 my-4"></div>
            <h1 className="text-white font-semibold">Andrew</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
