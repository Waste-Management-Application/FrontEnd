import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { client } from "../apiEndpoints/endpoints.js";
import { NavLink } from "react-router-dom";

function ProfilePage() {
  const [driver, setDriver] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);
  const handleDismissError = () => {
    setError(null); // Reset the error state to null
  };

  useEffect(() => {
    // Function to fetch customer data from the backend
    const fetchCustomerData = async () => {
      try {
        // Decode the token and retrieve the customer ID
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const driverId = decodedToken.id;

        // Fetch the customer data from the backend
        const response = await client.get(`/drivers/${driverId}`);
        setDriver(response.data.data.driver);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError(error.message);
      }
    };

    fetchCustomerData();
  }, []);

  if (!driver) {
    // Show loading or fallback UI while fetching customer data
    return <div>Loading...</div>;
  }

  // Destructure firstName, lastName, email, contact, and gender from driver object
  const { firstName, lastName, email, contact, gender, vehicleNo } = driver;

  // Function to handle opening the edit modal
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="h-screen w-full overflow-clip">
        <div className="h-52 bg-g3 border-none opacity-90 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src="./src/assets/user44.png"
                className="rounded-full w-24 h-24  m-2"
                alt="profile"
              />
            </div>
            <div>
              <div>
                <h1 className="text-3xl text-white">{`${firstName} ${lastName}`}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 rounded-b-full bg-g3 border-b-none opacity-90 shadow-xl mb-5"></div>
        <div className="flex flex-col h-screen p-2 ">
          <div className="m-3">
            <h1 className="text-gray-500">Email</h1>
            <h1 className="text-xl">{email}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">Contact</h1>
            <h1 className="text-xl">{contact}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">Gender</h1>
            <h1 className="text-xl">{gender}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">Vehicle No.</h1>
            <h1 className="text-xl">{vehicleNo}</h1>
          </div>
          <div
            onClick={handleOpenEditModal}
            className="w-full flex justify-center"
          >
            <button className="flex border-[2px] shadow-xl border-g2 text-g2 font-semibold h-12  p-4 bg-white rounded-3xl m-4 justify-center items-center hover:bg-g3 hover:text-white w-[40%]">
              Edit
            </button>
            <NavLink
              to="/MainPage"
              className="flex border-[2px] shadow-xl border-white text-white font-semibold h-12  p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-g3 hover:text-white w-[40%]"
            >
              <button>Home</button>
            </NavLink>
          </div>
        </div>
        {error && (
          <div className="text-red-500 mt-2">
            {error}
            <button
              className="ml-2 text-sm underline"
              onClick={handleDismissError}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Add the EditProfileModal component */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        user={driver}
      />
    </div>
  );
}

export default ProfilePage;
