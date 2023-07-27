import Dashboard from "./Dashboard";
import { BiEdit } from "react-icons/bi";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      {/* container for right side */}
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="m-4 w-full flex justify-between ">
          <h1 className="font-semibold text-3xl text-g4">Profile</h1>

          <BiEdit
            className="flex justify-center items-center text-g4 rounded-full h-6 w-10  m-4"
            onClick={handleOpenModal}
          />
        </div>
        <div className="h-screen w-full bg-gray-300 overflow-hidden p-5">
          <div className="h-screen w-full bg-gray-100 overflow-hidden  rounded-xl flex flex-col  items-end">
            <div className="h-24 w-[70%] border-2 m-5 rounded-lg flex ">
              <img
                src="./src/assets/man-avatar-profile-picture-vector-illustration_268834-538.avif"
                className="rounded-full w-16 h-16  m-2"
              ></img>

              <div className="p-3">
                <h1>Andrew Antwi Ababio</h1>
                <p className="text-gray-500">Admin</p>
                <p className="text-gray-500">Accra Ghana</p>
              </div>
            </div>
            <div className="flex justify-between h-56 w-[70%] border-2 m-5 rounded-lg p-3">
              <div>
                <div>
                  <h1 className="font-bold">Personal Information</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">First Name</h1>
                  <h1>Andrew</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">Email Address</h1>
                  <h1>andrewantwi@gmail.com</h1>
                </div>
              </div>
              <div>
                <div className="m-5">
                  <h1 className="text-gray-500">Last Name</h1>
                  <h1>Antwi</h1>
                </div>
                <div className="m-3">
                  <h1 className="text-gray-500">Contact</h1>
                  <h1>+233 50 212344</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditProfileModal onClose={handleCloseModal} isOpen={isModalOpen} />
      </div>
    </div>
  );
}

export default ProfilePage;
