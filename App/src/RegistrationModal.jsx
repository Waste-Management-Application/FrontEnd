import PropTypes from "prop-types";

function RegistrationModal({ isOpen, onClose, isOn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="z-10 bg-white p-6 rounded-md shadow-md relative ">
        <h2 className="text-xl font-semibold mb-4">
          Add New {isOn ? "Bin" : "Vehicle"}
        </h2>

        <div className="mt-4 flex justify-between w-[200px]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-g3 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isOn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegistrationModal;
