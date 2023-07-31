import { useState } from "react";
import PropTypes from "prop-types";
import { client } from "../../apiEndpoints/endpoints";

function EditProfileModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    contact: user.contact || "",
    email: user.email || "",
    city: user.location.city || "",
    coordinates: user.location.coordinates || [0, 0],
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
      // Update the location field with city and coordinates
      const updatedLocation = {
        type: "Point",
        coordinates: formData.coordinates,
        city: formData.city,
      };
  
      // Send the updated data to the backend
      const response = await client.patch(`customers/${user._id}`, {
        ...formData,
        location: updatedLocation,
      });
  
      // Handle successful update (e.g., show a success message or update the user data)
      console.log("Profile updated successfully!");
      console.log("Updated admin data:", response.data); // The updated admin data from the server
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the geolocation position object
          const { latitude, longitude } = position.coords;

          // Update the city and coordinates in the formData state
          setFormData((prevFormData) => ({
            ...prevFormData,
            city: "Unknown", // You can set a default value here if needed
            coordinates: [longitude, latitude],
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          // Handle error while fetching geolocation
        }
      );
    } else {
      console.warn("Geolocation is not available in this browser.");
      // Handle case when geolocation is not supported
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

          {/* New input for the City field */}
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded-md mb-2"
          />

          {/* Display coordinates if available */}
          <p>Coordinates: {formData.coordinates.join(", ")}</p>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-2 py-2 m-2 bg-g3 text-white rounded-full border-white ml-2"
            >
              Get Location
            </button>
            <button
              type="submit"
              className="px-2 py-2 bg-g4 text-white rounded-full m-2" onClick={onClose}
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={formData.city === "Unknown" || formData.coordinates[0] === 0}
              className="px-2 py-2 bg-g3 text-white rounded-full m-2"
            >
              Update Profile
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
    location: PropTypes.shape({
      city: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
};

export default EditProfileModal;
