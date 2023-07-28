import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import { GrUserWorker } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { MdOutlineUpcoming } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { GiExitDoor } from "react-icons/gi";
import LogOutModal from "./LogOutModal";
import { client } from "../../apiEndpoints/endpoints.js";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driversCount, setDriversCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [feedbacksCount, setFeedbacksCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [totalRequestsCount, setTotalRequestsCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversResponse = await client.get("/drivers");
        if (driversResponse.data.status === "success") {
          setDriversCount(driversResponse.data.results);
        }

        const customersResponse = await client.get("/customers");
        if (customersResponse.data.status === "success") {
          setCustomersCount(customersResponse.data.results);
        }

        const feedbacksResponse = await client.get("/feedback");
        if (feedbacksResponse.data.status === "success") {
          setFeedbacksCount(feedbacksResponse.data.results);
        }

        const complaintsResponse = await client.get("/feedback/complaint");
        if (complaintsResponse.data.status === "success") {
          setComplaintsCount(complaintsResponse.data.results);
        }

        const dustbinRequestsResponse = await client.get("/dustbinRequest");
        if (dustbinRequestsResponse.data.status === "success") {
          const dustbinRequestsCount = dustbinRequestsResponse.data.results;

          const pickupRequestsResponse = await client.get("/pickupRequest");
          if (pickupRequestsResponse.data.status === "success") {
            const pickupRequestsCount = pickupRequestsResponse.data.results;

            const totalRequests = dustbinRequestsCount + pickupRequestsCount;
            setTotalRequestsCount(totalRequests);
          }
        }

        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data. Please try again.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-center my-4">Loading...</p>;
  }

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="m-4 w-full flex justify-between">
          <h1 className="font-semibold text-3xl text-g4">Welcome Admin</h1>
          <GiExitDoor
            className="flex justify-center items-center text-g4 rounded-full h-10 w-10 m-4 hover:cursor-pointer"
            onClick={handleOpenModal}
          />
        </div>

        <div className="h-[90%] grid grid-cols-3 grid-rows-2 w-full gap-4">
          <NavLink
            to="/tracking"
            className="m-4 rounded-md border shadow-lg col-span-1 row-span-1"
          >
            <div className="w-full border-b-2 h-[15%]">
              <h1 className="m-2">Real time Tracking</h1>
            </div>
            <div>
              <img
                src="./src/assets/Simple-Location-Picker.webp"
                alt="Map"
              />
            </div>
          </NavLink>
          <div className="col-span-2 m-4 grid grid-cols-3 gap-4">
            <NavLink to="/drivers" className="border shadow-lg">
              <GrUserWorker className="h-8 w-8" />
              <h1>drivers</h1>
              <h1 className="font-bold text-g2 text-5xl">{driversCount}</h1>
            </NavLink>
            <NavLink to="/requests" className="border shadow-lg">
              <MdOutlineUpcoming className="h-8 w-8" />
              <h1>Requests</h1>
              <h1 className="font-bold text-g2 text-5xl">{totalRequestsCount}</h1>
            </NavLink>
            <NavLink to="/customers" className="border shadow-lg">
              <BsPeople className="h-8 w-8 text-2xl" />
              <h1>Customers</h1>
              <h1 className="font-bold text-g2 text-5xl">{customersCount}</h1>
            </NavLink>
            <div className="grid grid-cols-2 col-span-3 gap-4">
              <NavLink to="/feedbacks" className="border col-span- shadow-lg">
                <BiMessageDetail className="h-8 w-8" />
                <h1>Feedbacks</h1>
                <h1 className="font-bold text-g2 text-5xl">{feedbacksCount}</h1>
              </NavLink>
              <NavLink to="/complaints" className="border col-span-1 shadow-lg">
                <TfiAnnouncement className="h-8 w-8" />
                <h1>Complaints</h1>
                <h1 className="font-bold text-g2 text-5xl">{complaintsCount}</h1>
              </NavLink>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <div className="border col-span-1 shadow-lg">
              <div className="w-full border-b-2 h-[10%]">
                <h1 className="m-2">Scheduling</h1>
              </div>
              <div className="flex h-full justify-center items-center">
                <img
                  className="w-auto h-56"
                  src="./src/assets/schedule.png"
                  alt="Scheduling"
                />
              </div>
            </div>
            <NavLink to="/announcements" className="border col-span-1 shadow-lg">
              <div className="w-full border-b-2 h-[10%]">
                <h1 className="m-2">Announcements</h1>
              </div>
              <div className="flex h-full justify-center items-center">
                <img
                  className="w-auto h-60"
                  src="./src/assets/announce.jpeg"
                  alt="Announcements"
                />
              </div>
            </NavLink>
          </div>
        </div>
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        <LogOutModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default HomePage;
