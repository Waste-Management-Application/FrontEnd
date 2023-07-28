import { useState } from "react";
import PropTypes from "prop-types";

function EditProfileModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    email: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Reset the form state after submission if needed
    setFormData({
      name: "",
      location: "",
      contact: "",
      email: "",
      gender: "",
    });

    // Close the modal after successful form submission
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="z-10 bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New {user}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
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
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
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
  user: PropTypes.string.isRequired,
};

export default EditProfileModal;
