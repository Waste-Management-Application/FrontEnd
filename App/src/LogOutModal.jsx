import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function LogOutModal({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="z-10 bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-xl font-semibold mb-4">Do you wanna log out?</h2>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-g3 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <NavLink
            to="/signin"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Log out
          </NavLink>
        </div>
      </div>
    </div>
  );
}
LogOutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogOutModal;
