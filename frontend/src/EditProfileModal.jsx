import { useState } from "react";
import PropTypes from "prop-types";
import { client } from "../apiEndpoints/endpoints.js";

function EditProfileModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    contact: user.contact || "",
    email: user.email || "",
    vehicleNo: user.vehicleNo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated data to the backend
      const response = await client.patch(`drivers/${user._id}`, formData);

      // Handle successful update (e.g., show a success message or update the user data)
      console.log("Profile updated successfully!");
      console.log("Updated admin data:", response.data); // The updated admin data from the server
      console.log(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="z-10 bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border p-2 rounded-md mb-2"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border p-2 rounded-md mb-2"
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            placeholder="Vehicle No."
            className="w-full border p-2 rounded-md mb-2"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-g3 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default EditProfileModal;
