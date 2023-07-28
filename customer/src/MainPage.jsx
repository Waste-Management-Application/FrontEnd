// MainPage.js
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
import {client} from "../../apiEndpoints/endpoints";

function MainPage() {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [requestType, setRequestType] = useState(null);
  const toggle = () => {
    setOpen(!open);
  };
  const [error, setError] = useState(null);
  const [requestConfirmed, setRequestConfirmed] = useState(false);

  const handleModalConfirm = () => {
    if (requestType === "pickup") {
      client
        .post("/pickupRequest")
        .then((response) => {
          console.log(response.data);
          // Handle successful new bin request
          setOpenModal(false);
          setRequestConfirmed(true); // Update the state to indicate request confirmation
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred. Please try again later.");
        });
    } else if (requestType === "bin") {
      client
        .post("/dustbinRequest")
        .then((response) => {
          console.log(response.data);
          // Handle successful pickup request
          setOpenModal(false);
          setRequestConfirmed(true); // Update the state to indicate request confirmation
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred. Please try again later.");
        });
    } else {
      setOpenModal(false);
      setRequestConfirmed(false); // Update the state to indicate no request confirmation
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full">
        {open && <div className="fixed inset-0  backdrop-blur-md z-50"></div>}
        <div className="overflow-auto h-screen w-full">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1">
            <h1 className="font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar toggle={toggle} open={open} />
          </div>
          <div className="h-[600px]">
            <div className="flex justify-center">
              <img src={help} alt="" />
            </div>
            <h1 className="flex font-semibold justify-center my-4">
              Please choose your request
            </h1>
            <div className="h-auto w-fill m-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col h-24 shadow-lg justify-center items-center bg-white">
                <BsTrash className="text-g3 h-8 w-8" />
                <button
                  onClick={() => {
                    setRequestType("bin");
                    setOpenModal(true);
                  }}
                >
                  New Bin
                </button>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center bg-white">
                <TfiTruck className="text-g3 h-8 w-8" />
                <button
                  onClick={() => {
                    setRequestType("pickup");
                    setOpenModal(true);
                  }}
                >
                  Request Pickup
                </button>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center bg-white">
                <TfiAnnouncement className="text-g3 h-8 w-8" />
                <NavLink to="/Complaint">Make a complaint</NavLink>
              </div>
              <div className="flex flex-col h-24 shadow-lg justify-center items-center bg-white">
                <RiFeedbackLine className="text-g3 h-8 w-8" />
                <NavLink to="/Feedback">Feedback</NavLink>
              </div>
            </div>
          </div>
          <Bar />
        </div>
      </div>
      {openModal && (
        <Modal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleModalConfirm}
          requestType={requestType}
        />
      )}
      {requestConfirmed && <div>{/* Render the request confirmation */}</div>}
    </div>
  );
}

export default MainPage;
