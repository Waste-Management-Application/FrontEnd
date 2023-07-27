import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import { BiEdit } from "react-icons/bi";
import EditProfileModal from "./EditProfileModal";
import axios from 'axios';
import { adminClient } from "../../apiEndpoints/endpoints.js";
import DeleteAdminModal from "./DeleteAdminModal";

function ProfilePage() {
  const { adminId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Get the authentication token from local storage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authentication token not found.");
          return;
        }

        // Decode the token to get the adminId
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const adminId = decodedToken.id;

        // Make the API call to get the logged-in admin data
        const response = await adminClient.get(`admin/${adminId}`);
        setAdminData(response.data.data.admin);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAdmin = async () => {
    try {
      await adminClient.delete(`deleteAdmin/${adminId}`);
      // Handle successful deletion (e.g., show a success message or navigate to another page)
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting admin:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="m-4 w-full flex justify-between ">
          <h1 className="font-semibold text-3xl text-g4">Profile</h1>
          <BiEdit
            className="flex justify-center items-center text-g4 rounded-full h-6 w-10  m-4"
            onClick={handleOpenModal}
          />
        </div>
        <div className="h-screen w-full bg-gray-300 overflow-hidden p-5">
          {adminData && (
            <div className="h-screen w-full bg-gray-100 overflow-hidden  rounded-xl">
              <div className="h-24 w-[70%] border-2 m-5 rounded-lg flex">
                <img
                  src="./src/assets/man-avatar-profile-picture-vector-illustration_268834-538.avif"
                  className="rounded-full w-16 h-16 m-2"
                  alt="Profile Avatar"
                />
                <div className="p-3">
                  <h1>{adminData.firstName} {adminData.lastName}</h1>
                  <p className="text-gray-500">Admin</p>
                </div>
              </div>
              <div className="h-full w-[70%] border-2 m-5 rounded-lg p-3">
                <div>
                  <h1 className="font-bold">Personal Information</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">First Name</h1>
                  <h1>{adminData.firstName}</h1>
                </div>
                <div className="m-5">
                  <h1 className="text-gray-500">Last Name</h1>
                  <h1>{adminData.lastName}</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">Email Address</h1>
                  <h1>{adminData.email}</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">Location</h1>
                  <h1>{adminData.location}</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">Contact</h1>
                  <h1>{adminData.contact}</h1>
                </div>
                {/* Delete button */}
                <div className="flex justify-center mt-5">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={openDeleteModal}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {adminData && (
          <>
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              user={adminData}
            />
            <DeleteAdminModal
              isOpen={showDeleteModal}
              onDelete={handleDeleteAdmin}
              onClose={closeDeleteModal}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
