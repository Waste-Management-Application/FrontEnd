import Bar from "./Bar";
import SideBar from "./SideBar";
import "./App.css";
import help from "./assets/help.jpeg";

import { BsTrash } from "react-icons/bs";
import { TfiTruck, TfiAnnouncement } from "react-icons/tfi";
import { RiFeedbackLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

function MainPage() {
  const [openModal, setOpenModal] = useState(false);
  const [request, setRequest] = useState(false);
  const [bin, setBin] = useState(false);

  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-auto   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className=" h-[600px]">
            <div className="flex justify-center">
              <img src={help} alt="" />
            </div>
            <h1 className="flex font-semibold justify-center my-4">
              Please choose your request
            </h1>
            <div className=" h-auto w-fill m-8  grid grid-cols-2 gap-4">
              <div className="flex flex-col h-24 shadow-lg justify-center items-center  bg-white">
                <BsTrash className="text-g3 h-8 w-8" />
                <button
                  onClick={() => {
                    setRequest(false);
                    setBin(true);
                    setOpenModal(true);
                  }}
                >
                  New Bin
                </button>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center bg-white ">
                <TfiTruck className="text-g3 h-8 w-8" />

                <button
                  onClick={() => {
                    setRequest(true);
                    setBin(false);
                    setOpenModal(true);
                  }}
                >
                  Request Pickup
                </button>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center  bg-white ">
                <TfiAnnouncement className="text-g3 h-8 w-8" />
                <NavLink to="/Complaint">Make a complaint</NavLink>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center  bg-white ">
                <RiFeedbackLine className="text-g3 h-8 w-8" />
                <NavLink to="/Feedback">Feedback</NavLink>
              </div>
              <Modal
                openModal={openModal}
                request={request}
                onClose={() => {
                  setOpenModal(false);
                }}
                bin={bin}
              />
            </div>
          </div>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
