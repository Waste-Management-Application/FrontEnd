import { useState } from "react";
import PropTypes from "prop-types";
import { client } from "../../apiEndpoints/endpoints";

function AddScheduleModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    taskType: "",
    status: "",
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
      // Replace 'your-api-endpoint' with the actual endpoint to add a new task
      const response = await client.post("/Task", formData);
      console.log("New task added:", response.data);

      // Reset the form state after successful form submission
      setFormData({
        taskType: "",
        status: "",
      });

      // Call the onSuccess callback provided by the parent component
      // to refresh the data after adding a new task
      onSuccess();

      // Close the modal after successful form submission
      onClose();
    } catch (error) {
      console.error("Error adding new task:", error);
      // Handle any error that occurred during the API call, if needed
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
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="taskType"
            value={formData.taskType}
            onChange={handleChange}
            placeholder="Task"
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
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddScheduleModal;
