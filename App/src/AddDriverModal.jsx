import { useState } from "react";
import PropTypes from "prop-types";
import { addCustomer, addDriver } from "../apiEndpoints/endpoints";

function AddDriverModal({ isOpen, onClose, user }) {
  const initialFormData = {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    vehicleNo: "",
    digitalAddress: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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
      if (user === "Driver") {
        // Call the API to add a new driver
        await addDriver(formData);
      } else if (user === "Customer") {
        // Call the API to add a new customer
        await addCustomer(formData);
      }

      // Reset the form state after successful form submission
      setFormData(initialFormData);

      // Close the modal after successful form submission
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle the error and show an error message to the user if needed
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New {user}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border p-2 rounded-md mb-2 mr-2"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border p-2 rounded-md mb-2"
            />
          </div>
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

          {user === "Customer" && (
            <>
              <input
                type="text"
                name="digitalAddress"
                value={formData.digitalAddress}
                onChange={handleChange}
                placeholder="Digital Address"
                className="w-full border p-2 rounded-md mb-2"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border p-2 rounded-md mb-2"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border p-2 rounded-md mb-2"
              />
            </>
          )}

          {user === "Driver" && (
            <>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                placeholder="Vehicle No"
                className="w-full border p-2 rounded-md mb-2"
              />
            </>
          )}

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
AddDriverModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default AddDriverModal;
