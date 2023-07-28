import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              ></img>
            </div>
            <div>
              <div>
                <h1 className="text-3xl text-white">Andrew Antwi</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-white">Accra,Ghana</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 rounded-b-full bg-g3 border-b-none opacity-90 shadow-xl mb-5"></div>
        <div className="flex flex-col h-screen p-4 ">
          <div className="m-5">
            <h1 className="text-gray-500">Name</h1>
            <h1 className="text-2xl">Andrew Antwi</h1>
          </div>
          <div className="m-5">
            <h1 className="text-gray-500">Email</h1>
            <h1 className="text-2xl">andrew@gmail.com</h1>
          </div>
          <div className="m-5">
            <h1 className="text-gray-500">Contact</h1>
            <h1 className="text-2xl">233 4050 92300</h1>
          </div>
          <div className="m-5">
            <h1 className="text-gray-500">Location</h1>
            <h1 className="text-2xl">Mankraso Estate</h1>
          </div>
          <div className="flex border-[2px] shadow-xl border-g2 text-g2 font-semibold h-12  p-4 bg-white rounded-3xl m-16 justify-center items-center hover:bg-g3 hover:text-white ">
            <button onClick={handleOpenModal}>Edit</button>
          </div>
        </div>
        <EditProfileModal onClose={handleCloseModal} isOpen={isModalOpen} />
      </div>
    </div>
  );
}

export default ProfilePage;
