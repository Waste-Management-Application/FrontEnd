import PropTypes from "prop-types";
import requestbin from "./assets/requestbin.png";
import trashTruck from "./assets/trashtruck.jpeg";

function Modal({ openModal, onClose, onConfirm, requestType }) {
  if (!openModal) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  let modalText;
  let modalImage;
  if (requestType === 'pickup') {
    modalText = 'Do you want a special pickup?';
    modalImage = trashTruck;
  } else if (requestType === 'bin') {
    modalText = 'Do you want an extra bin?';
    modalImage = requestbin;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0 flex items-center justify-center">
      <div className="flex flex-row bg-white h-[30%] w-full">
        <div className="h-full w-[60%]">
          <img src={requestType === 'pickup' ? trashTruck : requestbin} className="h-full w-full" alt="" />
        </div>
        <div className="flex flex-col font-semibold">
          <div className="flex w-full justify-end items-start">
            <button onClick={onClose}>X</button>
          </div>
          <div>
            <p>{modalText}</p>
          </div>

          <div className="flex flex-row justify-between m-8">
            <button
              className="border w-20 border-g3 bg-g3 text-white rounded-md shadow-lg"
              onClick={handleConfirm}
            >
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
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  requestType: PropTypes.string.isRequired,
};

export default Modal;
