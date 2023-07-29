import React, { useEffect, useState } from "react";
import EditProfileModal from "./editProfileModal";
import { client } from "../../apiEndpoints/endpoints.js";

function ProfilePage() {
  const [driver, setDriver] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Function to fetch customer data from the backend
    const fetchCustomerData = async () => {
      try {
        // Decode the token and retrieve the customer ID
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authentication token not found.");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const driverId = decodedToken.id;

        // Fetch the customer data from the backend
        const response = await client.get(`/drivers/${driverId}`);
        setDriver(response.data.data.driver);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  if (!driver) {
    // Show loading or fallback UI while fetching customer data
    return <div>Loading...</div>;
  }

  // Destructure firstName, lastName, email, contact, and gender from driver object
  const { firstName, lastName, email, contact, gender } = driver;

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
                src="./src/assets/man-avatar-profile-picture-vector-illustration_268834-538.avif"
                className="rounded-full w-24 h-24  m-2"
                alt="Profile Picture"
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
        <div className="flex flex-col h-screen p-4 ">
          <div className="m-5">
            <h1 className="text-gray-500">Email</h1>
            <h1 className="text-xl">{email}</h1>
          </div>
          <div className="m-5">
            <h1 className="text-gray-500">Contact</h1>
            <h1 className="text-xl">{contact}</h1>
          </div>
          <div className="m-5">
            <h1 className="text-gray-500">Gender</h1>
            <h1 className="text-xl">{gender}</h1>
          </div>
          <div className="flex border-[2px] shadow-xl border-g2 text-g2 font-semibold h-12  p-4 bg-white rounded-3xl m-16 justify-center items-center hover:bg-g3 hover:text-white">
            <button onClick={handleOpenEditModal}>Edit</button>
          </div>
        </div>
      </div>

      {/* Add the EditProfileModal component */}
      <EditProfileModal isOpen={showEditModal} onClose={handleCloseEditModal} user={driver} />
    </div>
  );
}

export default ProfilePage;
