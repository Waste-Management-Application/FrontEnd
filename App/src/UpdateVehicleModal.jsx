import PropTypes from "prop-types";
import { client } from "../../apiEndpoints/endpoints.js";
import { useState } from "react";

function EditModal({ isOpen, onClose, vehicleData, isOn }) {
  const [driverName, setDriverName] = useState(vehicleData.driverName);

  const handleUpdate = async () => {
    try {
      // Make the API request to update the data
      const response = await client.patch(`/vehicle/${vehicleData.id}`, {
        // Use the appropriate endpoint to update the vehicle data based on the vehicle's ID
        driverName: driverName,
        // Add other fields you want to update here
      });

      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Check if the modal is open and if it's the vehicle side (!isOn)
  if (!isOpen ||  isOn) {
    // If the modal is not open or isOn is true (Dustbin side), do not render the modal
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="z-10 bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
        <div className="mt-4">
          <label className="block mb-2 font-medium">Driver Name:</label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-between w-[200px]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-g3 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate} // Call handleUpdate when "Update" button is clicked
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vehicleData: PropTypes.object.isRequired,
  isOn: PropTypes.bool.isRequired,
};

export default EditModal;
