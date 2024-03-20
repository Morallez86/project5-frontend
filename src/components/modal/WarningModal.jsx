import React from 'react';

const WarningModal = ({ isOpen, onClose, title, message, buttonText, onButtonClick }) => {
  return (
    <>
      {isOpen && (
        <div className=" inset-0 z-10 flex">
          <div className="fixed inset-0 bg-black opacity-75"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20">
            <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
            <p className=" text-gray-800">{message}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                onClick={() => {
                  onButtonClick();
                  onClose();
                }}
              >
                {buttonText}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningModal;
