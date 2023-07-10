import PropTypes from "prop-types";
import requestbin from "./assets/requestbin.png";
import trashTruck from "./assets/trashtruck.jpeg";

function Modal({ openModal, onClose, request }) {
  if (!openModal) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm  z-0  flex items-center justify-center ">
      <div className="flex flex-row bg-white h-[30%] w-full">
        <div className="h-full w-[60%]">
          <img
            src={`${request ? trashTruck : requestbin}`}
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col font-semibold">
          <div className="flex w-full justify-end items-start">
            <button onClick={onClose} className="">
              X
            </button>
          </div>
          <div>
            <p>{`Do you want ${
              request ? "a special pickup" : "an extra bin"
            }?`}</p>
          </div>

          <div className="flex flex-row justify-between m-8 ">
            <button className="border w-20 border-g3 bg-g3 text-white rounded-md shadow-lg">
              <span>Yes</span>
            </button>
            <button
              onClick={onClose}
              className="border w-20 mx-4 bg-g2 border-g3 text-white rounded-md shadow-lg"
            >
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  bin: PropTypes.bool.isRequired,
  request: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
